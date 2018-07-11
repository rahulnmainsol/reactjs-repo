import React , { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import { Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost';

import './Posts.css'

class Posts extends Component{

    state ={
        posts: []
    }

    componentDidMount(){

        console.log(this.props);
        axios.get('/posts')
            .then( response =>{
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post =>{
                   return{
                       ...post,
                       author : 'Max'
                   }
                })
                this.setState({posts:updatedPosts});
                // console.log(response);
            })
            .catch(errors =>{
                console.log(errors);
                //this.setState({getError:true});
            });

    }

    
    postSelectedHandler = (id) => {
        // this.setState({selectedPostId: id});
        this.props.history.push({pathname: '/posts/' + id});
        //alternate way for the above
        // this.props.history.push('/' + id);
    }

    render(){

        let posts = <p>Something went wrong</p>;

        if(!this.state.getError){
            posts = this.state.posts.map( post =>{
                return (
                    // <Link to={'/posts/' + post.id} key={post.id}>

                        <Post key={post.id} 
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id) }/>
                    //</Link>
                    );
            })
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }

}


export default Posts;