// http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site/23259289#23259289

export default function timeAgo(date) {
  if (typeof date !== 'object') {
    date = new Date(date)
  }

  let seconds = Math.floor((new Date() - date) / 1000)
  let intervalType
  let interval = Math.floor(seconds / 31536000)

  if (interval >= 1) {
    intervalType = 'year'
  } else {
    interval = Math.floor(seconds / 2592000)

    if (interval >= 1) {
      intervalType = 'month'
    } else {
      interval = Math.floor(seconds / 86400)

      if (interval >= 1) {
        intervalType = 'day'
      } else {
        interval = Math.floor(seconds / 3600)

        if (interval >= 1) {
          intervalType = "hour"
        } else {
          interval = Math.floor(seconds / 60)

          if (interval >= 1) {
            intervalType = "minute"
          } else {
            interval = seconds
            intervalType = "second"
          }
        }
      }
    }
  }

  if (interval !== 1) {
    intervalType += 's'
  }

  return interval + ' ' + intervalType + ' ' + 'ago'
}