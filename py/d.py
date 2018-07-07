from collections import deque

cities = {
    'harbin': [('shenyang', 4)],
    'shenyang': [('harbin',4), ('dalian',3), ('qinhuangdao',5), ('beijing',4)],
    'beijing': [('shenyang',4), ('tianjin',1), ('shijiazhuang',1)],
    'shijiazhuang': [('beijing',1), ('taiyuan',3), ('jinan',5),('zhengzhou',2)],
    'taiyuan': [('shijiazhuang',3)],
    'tianjin': [('beijing',1), ('jinan',2)],
    'qinhuangdao': [('shenyang',5)],
    'qingdao': [('jinan',4)],
    'dalian': [('shenyang',3)],
    'jinan': [('shijiazhuang',5), ('tianjin',2), ('qingdao',4), ('xuzhou',1)],
    'xuzhou': [('jinan',1), ('nanjing',1), ('zhengzhou',3)],
    'zhengzhou': [('xuzhou',3), ('shijiazhuang',2), ('xian',4), ('wuhan',2)],
    'xian': [('zhengzhou',4), ('baoji',2), ('jiangyou',6)],
    'baoji': [('xian',2), ('lanzhou',3)],
    'lanzhou': [('baoji',3), ('xining',3)],
    'xining': [('lanzhou',3)],
    'jiangyou': [('xian',6)],
    'wuhan': [('zhengzhou',2), ('chongqing',4), ('hefei',5), ('changsha',1)],
    'chongqing': [('wuhan',4), ('chengdu',3)],
    'chengdu': [('dazhou',6), ('chongqing',3)],
    'dazhou': [('chengdu',6)],
    'hefei': [('wuhan',5), ('nanjing',4)],
    'nanjing': [('xuzhou',1), ('hefei',4), ('shanghai',1)],
    'shanghai': [('nanjing',1), ('hangzhou',2), ('fuzhou',7)],
    'hangzhou': [('shanghai',2), ('changsha',5)],
    'changsha': [('hangzhou',5), ('wuhan',1), ('guiyang',5), ('guangzhou',2)],
    'guiyang': [('changsha',5), ('kunming',3)],
    'kunming': [('guiyang',3)],
    'guangzhou': [('changsha',2),('shenzhen',2)],
    'fuzhou': [('shanghai',7), ('shenzhen',5)],
    'shenzhen': [('fuzhou',5),('guangzhou',2)]
}

start = 'shanghai'

dest = 'chongqing'

dist={('harbin','beijing'):999999,(start,start):0}
path={('harbin','beijing'):[],(start,start):[start]}
checked={start:1}
checklist = deque(cities[start])



def d():
    while checklist:
        dd(checklist.popleft()[0])

def dd(checkPoint):
    children = cities[checkPoint] # get checkPoint's children
    tempdist = 999999
    tempTarget = None # the checked point that has the shortest path to checkPoint
    checked_of_mine={}
    for i in children:
        checking = i[0]
        if checking in checked:
            checked_of_mine[checking]=i[1]
            if (dist[(start,checking)]+i[1]) < tempdist:
                tempdist = dist[(start,checking)]+i[1] # find the shorter dist
                tempTarget = checking
        else:
            checklist.append(i)
    dist[(start, checkPoint)] = tempdist
    path[(start, checkPoint)] = path[(start,tempTarget)]+[checkPoint]
    checked[checkPoint]=1
    #recheck the checked points to see if any shorter path
    del checked_of_mine[tempTarget] # remove the one that in the path to checkPoint
    for i in checked_of_mine:
        if dist[(start, checkPoint)] + checked_of_mine[i] < dist[(start,i)]:
            dist[(start, i)] =dist[(start, checkPoint)] + checked_of_mine[i]
            path[(start, i)] =path[(start,checkPoint)]+[i]


            

d()
print(dist[start,dest])
print(path[start,dest])
