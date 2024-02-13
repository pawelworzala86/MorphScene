function CreateMesh(gl,meshshader,geometry){

     function CreateBuffer(type,data){
      const buffer = gl.createBuffer()
      gl.bindBuffer(type, buffer)
      gl.bufferData(type, data, gl.STATIC_DRAW)
      return buffer
   }

    var buffer={}
    var shader = meshshader

    buffer.vertex = CreateBuffer(gl.ARRAY_BUFFER,new Float32Array(geometry.vertices))
    //buffer.color = CreateBuffer(gl.ARRAY_BUFFER,new Float32Array(geometry.colors));
    if(geometry.indices){
        buffer.index = CreateBuffer(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(geometry.indices));
        }
        
            function SetAttribute4M(name,value){
               const uniform = gl.getUniformLocation(shader.program, name)
               gl.uniformMatrix4fv(uniform, false, value)
            }
            function SetAttributeBuffer(name,buffer,elemCount){
               gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
               const attribute = gl.getAttribLocation(shader.program, name)
               gl.vertexAttribPointer(attribute, elemCount, gl.FLOAT, false,0,0)
               gl.enableVertexAttribArray(attribute)
            }

    return {buffer,type:gl.TRIANGLES,
           render(proj_matrix,view_matrix,mo_matrix){



            gl.useProgram(shader.program);
     

         SetAttributeBuffer('position', buffer.vertex,3)
         //SetAttributeBuffer('color', buffer.color,3)




         SetAttribute4M('Pmatrix', proj_matrix)
         SetAttribute4M('Vmatrix', view_matrix)
         SetAttribute4M('Mmatrix', mo_matrix)
  

       
               
               if(geometry.indices){
                   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.index);
                   gl.drawElements(this.type, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
               }else{
                  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertex);
                  gl.drawArrays(this.type, 0, geometry.vertices.length/3);
                }
               
           },
            }

    
}