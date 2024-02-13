async function CreateModel(gl,shader){

    var outmodel1 = await loadOBJ('./models/bryla/scene.obj')
    var outmodel2 = await loadOBJ('./models/bryla/scene2.obj')

    //console.log(model)
    console.log(outmodel1)

    var percent = document.querySelector('#redraw').value/100

    for(let i=0;i<outmodel1.vertices.length;i++){
        outmodel1.vertices[i] = ((outmodel1.vertices[i]*percent)+(outmodel2.vertices[i]*(1.0-percent)))
    }

        var geometry = outmodel1


   var shader = await CreateShader(gl)

    var meshes = []
    
    var mesh = CreateMesh(gl, shader, geometry)
    //mesh.type = gl.LINES
    meshes.push(mesh)

    var mo_matrix = mat4.create()

    return {
        mo_matrix,

        render(proj_matrix,view_matrix){

            for(let mesh of meshes){
                
                mesh.render(proj_matrix,view_matrix,this.mo_matrix)
                
            }
            
        }
    }

}

async function loadOBJ(path){
    const obj = await get(path)

    const lines = obj.split('\n')

    var model = {vertices:[],normals:[],coords:[],indices:[],}
    var outmodel = {vertices:[],normals:[],coords:[]}

    //console.log(lines[0])
    var FUNCS = {
        v(params){
            model.vertices.push(params.map(parseFloat))
        },
        vn(params){
        model.normals.push(params.map(parseFloat))
        },
        vt(params){
        model.coords.push(params.map(parseFloat))
        },
        f(params){
            params=params.map(f=>{
                var arr = f.split('/')
                arr = arr.map(a=>parseInt(a))
                //model.indices.push(...arr)
                return arr
            })
            outmodel.vertices.push(
                ...model.vertices[params[0][0]-1],
                ...model.vertices[params[1][0]-1],
                ...model.vertices[params[2][0]-1]
            )
            outmodel.coords.push(
                ...model.coords[params[0][1]-1],
                ...model.coords[params[1][1]-1],
                ...model.coords[params[2][1]-1]
            )
            outmodel.normals.push(
                ...model.normals[params[0][2]-1],
                ...model.normals[params[1][2]-1],
                ...model.normals[params[2][2]-1]
            )
            //model.indices.push(params[0][1],params[1][1],params[2][1])
            //model.indices.push(params[0][2],params[1][2],params[2][2])
        },
    }

    

    for(const line of lines){

        var key = line.split(' ')[0]
        var params = line.split(' ').map(a=>a.trim())
        params.splice(0,1)
        
        if(FUNCS[key]!==undefined){
            FUNCS[key](params)
        }

    }

    return outmodel
}