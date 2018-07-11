import React, { Component } from 'react';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';

import './Blog.css';
import { Route , NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';

const asyncNewPost = asyncComponent( () => {
    return import('./NewPost/NewPost');
});



class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Posts</NavLink></li>
                        </ul>
                    </nav>
                </header>
                
                
                <Switch>
                    <Route path="/new-post" component={asyncNewPost}/>
                    <Route path="/posts"  component={Posts}/>
                    <Redirect from="/" to="/posts" />
                </Switch>

                
            {/* <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;