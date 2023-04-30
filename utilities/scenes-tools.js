///function that pops the first element that is the same as its
popFirst =
    (ctx) => {
    (ctx.session.scenestodo).shift()
    }
//function that if the array is empty (after you removed the first one) it leaves scene, otherwise it do
checkIfTheQueueIsEnd =
    (ctx) => {
        if(ctx.session.scenestodo.length == 0){
            ctx.scene.leave();
        }else{
            ctx.scene.enter(`${(ctx.session.scenestodo)[0]}`)
        }
    }


sceneFlow =
    async (ctx) => {
        await popFirst(ctx)
        await checkIfTheQueueIsEnd(ctx)
//        console.log(ctx.session.scenestodo.length)
//        console.log(ctx.session.scenestodo)
    }

module.export=sceneFlow