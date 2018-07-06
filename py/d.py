from collections import deque

cities = {
    'harbin': [{'shenyang': 1}],
    'shenyang': [{'harbin':1}, {'dalian':2}, {'qinhuangdao':2}, {'beijing':3}],
    'beijing': [{'shenyang':3}, {'tianjin':1}, {'shijiazhuang':2}],
    'shijiazhuang': [{'beijing':2}, {'taiyuan':1}, {'jinan':3}],
    'taiyuan': [{'shijiazhuang':1}],
    'tianjin': [{'beijing':1}, {'jinan':3}],
    'qinhuangdao': [{'shenyang':3}],
    'qingdao': [{'jinan':1}],
    'dalian': [{'shenyang':2}],
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

start = 'harbin'

dest = 'beijing'

dist={('harbin','beijing'):999999}
path={('harbin','beijing'):[]}
checked={start:1}

def d():
    children = cities[start]
    for i in children:
        dist[(start,i)]=children[i]
        path[(start, i)] = [start,i]


def dd(checkPoint):
    children = cities[checkPoint]
    for i in children:
        if i in checked:
            




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

