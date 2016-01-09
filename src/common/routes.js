import React                 from 'react';
import { Route, IndexRoute } from 'react-router';

import App         from './containers/App'
import Home        from './layouts/Home'
import Attachment  from './layouts/Attachment'
import Search      from './layouts/Search'
import Author      from './layouts/Author'
import Archive     from './layouts/Archive'
import Post        from './layouts/Post'
import Page        from './layouts/Page'
import NotFound    from './layouts/NotFound'

export default (
  <Route        component={App}              path='/'>
    <IndexRoute component={Home} />
    <Route      component={Home}             path='/page/:paged' />
    <Route      component={Attachment}       path='/attachment/:attachment' />
    <Route      component={Search}           path='/search/:search(/page/:paged)' />
    <Route      component={Author}           path='/author/:author(/page/:paged)' />

    {/*<Route      component={CustomPostType}   path='/custom_post_type(/page/:paged)' />
    <Route      component={CustomPostType}   path='/custom_post_type/comments(/page/:paged)' />
    <Route      component={Attachment}       path='/custom_post_type/attachment/:attachment' />
    <Route      component={Attachment}       path='/custom_post_type/attachment/:attachment/comments(/page/:paged)' />*/}

    <Route      component={Archive}          path='/category/:post_category(/page/:paged)' />
    <Route      component={Archive}          path='/tag/:post_tag(/page/:paged)' />
    <Route      component={Archive}          path='/type/:post_format(/page/:paged)' />

    {/*<Route      component={CustomTaxonomy}   path='/taxonomy(/page/:paged)' />*/}

    <Route      component={Page}             path='/portfolio' />
    <Route      component={Page}             path='/contact' />

    <Route      component={Page}             path='/pages/:page(/page/:paged)' />
    <Route      component={Page}             path='/pages/:page/comments(/page/:paged)' />
    <Route      component={Attachment}       path='/pages/:page/attachment/:attachment' />
    <Route      component={Attachment}       path='/pages/:page/attachment/:attachment/comments(/page/:paged)' />

    <Route      component={Post}             path='/:post(/page/:paged)' />
    <Route      component={Post}             path='/:post/comments(/page/:paged)' />
    <Route      component={Attachment}       path='/:post/attachment/:attachment' />
    <Route      component={Attachment}       path='/:post/attachment/:attachment/comments(/page/:paged)' />
    <Route      component={Archive}          path='/archive/:year/:monthnum/:day(/page/:paged)' />
    <Route      component={Archive}          path='/archive/:year/:monthnum(/page/:paged)' />
    <Route      component={Archive}          path='/archive/:year(/page/:paged)' />

    <Route path="*" component={NotFound}/>
  </Route>
);