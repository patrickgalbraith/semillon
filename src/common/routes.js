import React                 from 'react';
import { Route, IndexRoute } from 'react-router';

import App         from './containers/App'
import Home        from './containers/layouts/Home'
import Attachment  from './containers/layouts/Attachment'
import Search      from './containers/layouts/Search'
import Author      from './containers/layouts/Author'
import Archive     from './containers/layouts/Archive'
import Post        from './containers/layouts/Post'
import Page        from './containers/layouts/Page'
import NotFound    from './containers/layouts/NotFound'

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

    <Route      component={Archive}          path='/blog(/page/:paged)' />
    <Route      component={Post}             path='/blog/:post(/page/:paged)' />
    <Route      component={Post}             path='/blog/:post/comments(/page/:paged)' />
    <Route      component={Attachment}       path='/blog/:post/attachment/:attachment' />
    <Route      component={Attachment}       path='/blog/:post/attachment/:attachment/comments(/page/:paged)' />
    <Route      component={Archive}          path='/blog/archive/:year/:monthnum/:day(/page/:paged)' />
    <Route      component={Archive}          path='/blog/archive/:year/:monthnum(/page/:paged)' />
    <Route      component={Archive}          path='/blog/archive/:year(/page/:paged)' />

    <Route      component={Page}             path='/:page(/page/:paged)' />
    <Route      component={Page}             path='/:page/comments(/page/:paged)' />
    <Route      component={Attachment}       path='/:page/attachment/:attachment' />
    <Route      component={Attachment}       path='/:page/attachment/:attachment/comments(/page/:paged)' />

    <Route path="*" component={NotFound}/>
  </Route>
);