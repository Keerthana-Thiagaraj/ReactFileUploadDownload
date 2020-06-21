import { func } from "prop-types"

// Basic method to post and retrieve the JSON response
// returns a POST promise
// async/await is not used, as it is not supported in all browsers(including IE all versions)


export const httpPost=function(url,method,data){

    return fetch((url),{
        method:method,
        credentials:'omit',
        headers:{
            'Content-Type':'multipart/form-data',

        },
        body:data?data:JSON.stringify({})
    })
    .then(checkStatus)
    .then(getBody)
    .then(parseBody)
    .catch(function(error){
        throw error
    })

}

export const httpGet=function(url){
    return fetch(url)
    .then(checkStatus)
    .then(getBody)
    .then(parseBody)
    .catch(function(error){
        throw error
    })
}

function checkStatus(response){
    if(response.status===200){
        return response
    }else{
        var error="API service is not available"
        throw error
    }
}

function getBody(response){
    return response.text()
}

function parseBody(response){

    return JSON.parse(response)

}

//Common request for all the features

export const placeRequest=function(url,method,request,successCallBack,errorCallBack){

    let req=''
    if(method=='POST'){

        req=JSON.stringify(request)
        return httpPost(url,method,req)
        .then(function(respObj){
            if(successCallBack)
                successCallBack(respObj)
        })
        .catch(function(error){
            if(errorCallBack)
                errorCallBack(error)
        });
    }else if(method==='GET'){
        return httpGet(url)
        .then(function(respObj){
            if(successCallBack)
                successCallBack(respObj)
        })
        .catch(function(error){
            if(errorCallBack)
                errorCallBack(error)
        });
    }

}