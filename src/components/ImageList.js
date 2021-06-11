import React, { Component } from 'react'
import { imageurl } from '../requires';

export default class ImageList extends Component {
       constructor(props){
              super(props);
              this.onPhotoClick = this.onPhotoClick.bind(this);
       }

       onPhotoClick(ind){
              this.props.onPhotoClick(ind);
       }
       imagerender(image, onClick, ind){
              const { farm, server, id, secret} = image;
              return(
                     <li key={ind} className = "img-arr" onClick={()=>onClick(ind)}>
                            <img className="img-list" src={imageurl(farm, server, id, secret)} alt=""/>
                     </li>
              )
       }
       render() {
              return (
                            <ul className = "hor-flex">
                                   {this.props.images.map((image, ind) => this.imagerender(image, this.onPhotoClick, ind))}
                            </ul>
                            
              )
       }
}
