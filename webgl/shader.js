async function CreateShader(gl){

    var vertCode = await get('/shaders/default.vert')
         var fragCode = await get('/shaders/default.frag')

      function CreateShader(type,code){
         const shader = gl.createShader(type)
         gl.shaderSource(shader,code)
         gl.compileShader(shader)
         return shader
      }

         var vertShader = CreateShader(gl.VERTEX_SHADER,vertCode)
         var fragShader = CreateShader(gl.FRAGMENT_SHADER,fragCode);

         var program = gl.createProgram();
         gl.attachShader(program, vertShader);
         gl.attachShader(program, fragShader);
         gl.linkProgram(program);

    return {program}
    
}