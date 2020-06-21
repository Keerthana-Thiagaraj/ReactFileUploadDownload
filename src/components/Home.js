import React, { Component } from 'react'
import { throwStatement } from '@babel/types'
import {placeRequest} from '../model/ApiCommunicator'
import {ApiURLs} from '../model/ServiceURLs'

class Home extends Component{

    constructor(props){
        super(props)
        this.state={
            selectedFile:undefined,
            currentFile:undefined,
            message:"",
            fileInfo:[],
        };

    }

    selectFile(e){
        this.setState({
            selectedFile:e.target.files
        })
    }

}
export default Home