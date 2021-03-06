from collections import deque

cities = {
    'harbin': ['shenyang'],
    'shenyang': ['harbin', 'dalian', 'qinhuangdao', 'beijing'],
    'beijing': ['shenyang', 'tianjin', 'shijiazhuang'],
    'shijiazhuang': ['beijing', 'taiyuan', 'jinan'],
    'taiyuan': ['shijiazhuang'],
    'tianjin': ['beijing', 'jinan'],
    'qinhuangdao': ['shenyang'],
    'qingdao': ['jinan'],
    'dalian': ['shenyang'],
    'jinan': ['taiyuan', 'tianjin', 'qingdao', 'xuzhou'],
    'xuzhou': ['jinan', 'nanjing', 'zhengzhou'],
    'zhengzhou': ['xuzhou', 'taiyuan', 'xian', 'wuhan'],
    'xian': ['zhengzhou', 'baoji', 'jiangyou'],
    'baoji': ['xian', 'lanzhou'],
    'lanzhou': ['baoji', 'xining'],
    'xining': ['lanzhou'],
    'jiangyou': ['xian'],
    'wuhan': ['zhengzhou', 'chongqing', 'hefei', 'changsha'],
    'chongqing': ['wuhan', 'chengdu'],
    'chengdu': ['dazhou', 'chongqing'],
    'dazhou': ['chengdu'],
    'hefei': ['wuhan', 'nanjing'],
    'nanjing': ['xuzhou', 'hefei', 'shanghai'],
    'shanghai': ['nanjing', 'hangzhou', 'fuzhou'],
    'hangzhou': ['shanghai', 'changsha'],
    'changsha': ['hangzhou', 'wuhan', 'guiyang', 'guangzhou'],
    'guiyang': ['changsha', 'kunming'],
    'kunming': ['guiyang'],
    'guangzhou': ['changsha'],
    'fuzhou': ['shanghai', 'shenzhen'],
    'shenzhen': ['fuzhou']
}

start = 'hangzhou'

dest = 'wuhan'

startingTree = {
    'parent': None,
    'root': start #,
    #'leaves': []
}
pendingSearch = [
    startingTree
]
searched =[start]


#destTree=None

def build_tree(pendingSearch, dest):
    destTree = None
    searchlist = deque(pendingSearch)
    while len(searchlist)>0:
        searching = searchlist.popleft()
        children = cities[searching['root']]
        if dest in children:
            destTree = {'parent': searching,'root': dest}
            #searching['leaves'].append(destTree)
            return True,destTree
        else:
            for i in children:
                if i not in searched:
                    newTree = {'parent': searching,'root': i}
                    #searching['leaves'].append(newTree)
                    searched.append(i)
                    searchlist.append(newTree)



    return False,destTree


level = 1


def printtree(tree,level):

    if len(tree['leaves'])>0:
        temp =''
        for i in tree['leaves']:
            temp = temp+' '+i['root']
        print(level,temp)
        for i in tree['leaves']:
            #level = level+1
            printtree(i,level+1)
    else:
        return




res = build_tree(pendingSearch, dest)
print(res[0])

def printt(node):
    print(node['root'])
    if node['parent'] != None:
        printt(node['parent'])

printt(res[1])
#print(destTree)
#printtree(startingTree,1)

