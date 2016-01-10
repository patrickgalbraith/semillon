import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import { get, flatten, forOwn } from 'lodash'

export function cleanupApiResponse(json) {
  if(Array.isArray(json)) {
    return json.map((item) => cleanupApiResponse(item))
  }

  if(json._embedded) {

    // Remove _embedded errors
    forOwn(json._embedded, (embeddedObj, key) => {
      json._embedded[key] = embeddedObj.filter(
        (item) => !item.code || item.code.indexOf('rest_') !== 0
      )
    })

    // Flatten terms
    // We need to do this because terms are inconsistent with other embedded results
    let terms = get(json, ['_embedded', 'https://api.w.org/term'])

    if(terms) {
      json._embedded["https://api.w.org/term"] = flatten(terms)
    }

    // Add missing "post" attribute to replies
    let replies = get(json, '_embedded.replies')

    if(replies) {
      json._embedded.replies = replies[0].map((reply, idx) => {
        return Object.assign(reply, {
          post: json.id
        })
      })
    }
  }

  return json
}

export function normalizeApiResponse(schema, json, response) {
  let jsonParsed = camelizeKeys(cleanupApiResponse(json))

  let result = Object.assign({},
    normalize(jsonParsed, schema)
  )

  // Remove keys that start with underscore
  forOwn(result.entities, (group) => {
    forOwn(group, (entity) => {
      forOwn(entity, (item, key) => {
        if(key.indexOf('_') === 0) {
          delete entity[key]
        }
      })
    })
  })

  const intOrNull = (val) => val === null ? null : parseInt(val, 10)

  result.pagination = {
    total: intOrNull(response.headers.get('X-WP-Total')),
    totalPages: intOrNull(response.headers.get('X-WP-TotalPages'))
  }

  return result
}