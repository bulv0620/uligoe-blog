// 下划线转换驼峰
const toHump = (name) => {
    return name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
const toLine = (name) => {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}

// 把数据库返回的下划线格式数据转为驼峰格式
const allToHump = (res) => {
    return JSON.parse(toHump(JSON.stringify(res)))
}

// 把树的列表转换为列表嵌套树
const toTree = (arr) => {
    let map = {}
    let data = JSON.parse(JSON.stringify(arr))

    data.forEach(item => {
        map[item.id] = item
    })

    let tree = []
    data.forEach(item => {
        let parent = map[item.pid]
        if(parent){
            (parent.children || ( parent.children = [] )).push(item)
        }
        else{
            tree.push(item)
        }
    })

    return tree
}

// 递归无限深度树结构
const toTreeDeep = (data) => {

}

module.exports = {
    toHump, toLine, allToHump, toTree, toTreeDeep
}

