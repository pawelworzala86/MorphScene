const mat4 = glMatrix.mat4
    const vec3 = glMatrix.vec3

;(async function(){
    
    
    var canvas = document.createElement('canvas')
    canvas.width=600
    canvas.height=600
    document.body.append(canvas)
    var gl = canvas.getContext('webgl2')
    



    var model = await CreateModel(gl)
    
    


   document.querySelector('#redraw').addEventListener('change',async function(){
      model = await CreateModel(gl)
   })



         

         

     

         var proj_matrix = mat4.create()
         mat4.perspective(proj_matrix, 45, canvas.width/canvas.height, 1, 100)
         var view_matrix = mat4.create()

         view_matrix[14] = view_matrix[14]-6;

         /*================= Mouse events ======================*/

         var AMORTIZATION = 0.95;
         var drag = false;
         var old_x, old_y;
         var dX = 0, dY = 0;

         var mouseDown = function(e) {
            drag = true;
            old_x = e.pageX, old_y = e.pageY;
            e.preventDefault();
            return false;
         };

         var mouseUp = function(e){
            drag = false;
         };

         var mouseMove = function(e) {
            if (!drag) return false;
            dX = (e.pageX-old_x)*2*Math.PI/canvas.width,
            dY = (e.pageY-old_y)*2*Math.PI/canvas.height;
            THETA+= dX;
            PHI+=dY;
            old_x = e.pageX, old_y = e.pageY;
            e.preventDefault();
         };

         canvas.addEventListener("mousedown", mouseDown, false);
         canvas.addEventListener("mouseup", mouseUp, false);
         canvas.addEventListener("mouseout", mouseUp, false);
         canvas.addEventListener("mousemove", mouseMove, false);

         /*=========================rotation================*/

     

         var THETA = 0,
         PHI = 0;
         var time_old = 0;

         var animate = function(time) {
            var dt = time-time_old;

            if (!drag) {
               dX *= AMORTIZATION, dY*=AMORTIZATION;
               THETA+=dX, PHI+=dY;
            }

            model.mo_matrix = mat4.create()

            mat4.rotateY(model.mo_matrix,model.mo_matrix,THETA)
            mat4.rotateX(model.mo_matrix,model.mo_matrix,PHI)

            time_old = time; 
            gl.enable(gl.DEPTH_TEST);

            // gl.depthFunc(gl.LEQUAL);

            gl.clearColor(0.5, 0.5, 0.5, 0.9);
            gl.clearDepth(1.0);
            gl.viewport(0.0, 0.0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);





             model.render(proj_matrix,view_matrix)
            


            window.requestAnimationFrame(animate);
         }
         animate(0);
    
    
    
    
    
})()