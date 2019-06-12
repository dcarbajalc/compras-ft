import spin from './spinner.gif'
import React from 'react';

const spinner = (data) =>{
let {dim} = data
return (
    <div><img height = {`${dim}px`} width= {`${dim}px`} src = {spin} alt='Cállate'/></div>
)
}

export default spinner;