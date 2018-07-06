from collections import deque

cities = {
    'harbin': [{'shenyang': 1}],
    'shenyang': [{'harbin':1}, {'dalian':2}, {'qinhuangdao':2}, {'beijing':3}],
    'beijing': [{'shenyang':3}, {'tianjin':1}, {'shijiazhuang':2}],
    'shijiazhuang': [{'beijing':2}, {'taiyuan':1}, {'jinan':3},{'zhengzhou':4}],
    'taiyuan': [{'shijiazhuang':1}],
    'tianjin': [{'beijing':1}, {'jinan':3}],
    'qinhuangdao': [{'shenyang':3}],
    'qingdao': [{'jinan':1}],
    'dalian': [{'shenyang':2}],
    'jinan': [{'shijiazhuang':3}, {'tianjin':2}, {'qingdao':1}, {'xuzhou':1}],
    'xuzhou': [{'jinan':1}, {'nanjing':1}, {'zhengzhou':3}],
    'zhengzhou': [{'xuzhou':3}, {'shijiazhuang':4}, {'xian':5}, {'wuhan':2}],
    'xian': [{'zhengzhou':5}, {'baoji':1}, {'jiangyou':5}],
    'baoji': [{'xian':1}, {'lanzhou':3}],
    'lanzhou': [{'baoji':3}, {'xining':2}],
    'xining': [{'lanzhou':2}],
    'jiangyou': [{'xian':5}],
    'wuhan': [{'zhengzhou':2}, {'chongqing':4}, {'hefei':3}, {'changsha':2}],
    'chongqing': [{'wuhan':4}, {'chengdu':2}],
    'chengdu': [{'dazhou':4}, {'chongqing':2}],
    'dazhou': [{'chengdu':4}],
    'hefei': [{'wuhan':3}, {'nanjing':2}],
    'nanjing': [{'xuzhou':1}, {'hefei':2}, {'shanghai':2}],
    'shanghai': [{'nanjing':2}, {'hangzhou':1}, {'fuzhou':4}],
    'hangzhou': [{'shanghai':1}, {'changsha':4}],
    'changsha': [{'hangzhou':4}, {'wuhan':2}, {'guiyang':5}, {'guangzhou':3}],
    'guiyang': [{'changsha':5}, {'kunming':2}],
    'kunming': [{'guiyang':2}],
    'guangzhou': [{'changsha':3}],
    'fuzhou': [{'shanghai':4}, {'shenzhen':5}],
    'shenzhen': [{'fuzhou':5}]
}

start = 'harbin'

dest = 'jiangyou'

dist={('harbin','beijing'):999999,(start,start):0}
path={('harbin','beijing'):[],(start,start):[start]}
checked={start:1}
checklist = deque(cities[start])



def d():
    while checklist:
        dd(list(checklist.popleft())[0])

def dd(checkPoint):
    children = cities[checkPoint] # get checkPoint's children
    tempdist = 999999
    tempTarget = None
    for i in children:
        checking = list(i)[0]
        if checking in checked:
            if (dist[(start,checking)]+i[checking]) < tempdist:
                tempdist = dist[(start,checking)]+i[checking] # find the shorter dist
                tempTarget = checking
        else:
            checklist.append(i)
    dist[(start, checkPoint)] = tempdist
    path[(start, checkPoint)] = path[(start,tempTarget)]+[checkPoint]
    checked[checkPoint]=1


            

d()
print(dist[start,dest])
print(path[start,dest])
