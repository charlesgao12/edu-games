from collections import deque
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
import json

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

#start = 'nanjing'
#dest = 'shenzhen'

class Tree:
    # destTree=None

    def build_tree(self, start, dest):
        startingTree = {
            'parent': None,
            'root': start  # ,
            # 'leaves': []
        }
        pendingSearch = [
            startingTree
        ]
        searched = [start]

        #destTree = None
        searchlist = deque(pendingSearch)
        while len(searchlist) > 0:
            searching = searchlist.popleft()
            children = cities[searching['root']]

            for i in children:
                if dest == i[0]:
                    destTree = {'parent': searching, 'root': dest}
                    # searching['leaves'].append(destTree)
                    return True, self.getPath(destTree)
                elif i[0] not in searched:
                    newTree = {'parent': searching, 'root': i[0]}
                    # searching['leaves'].append(newTree)
                    searched.append(i[0])
                    searchlist.append(newTree)

            '''if dest in children:
                destTree = {'parent': searching, 'root': dest}
                # searching['leaves'].append(destTree)
                return True, destTree
            else:
                for i in children:
                    if i not in searched:
                        newTree = {'parent': searching, 'root': i}
                        # searching['leaves'].append(newTree)
                        searched.append(i)
                        searchlist.append(newTree)
            '''

        return False, None

    #res = build_tree()
    #print(res[0])

    def getPath(self,node):
        path=[]
        while node != None:
            path.insert(0,node['root'])
            node = node['parent']
        return path

class Dij:
    dist = {}
    path = {}
    checked = {}
    checklist = None

    def dij(self,start, dest):
        dist = {(start, start): 0}
        path = {(start, start): [start]}
        checked = {start: 1}
        checklist = deque(cities[start])

        while self.checklist:
            self.dd(self.checklist.popleft()[0])

        print(self.dist[start,dest])
        print(self.path[start, dest])

    def dd(self,checkPoint):
        children = cities[checkPoint]  # get checkPoint's children
        tempdist = 999999
        tempTarget = None  # the checked point that has the shortest path to checkPoint
        checked_of_mine = {}
        for i in children:
            checking = i[0]
            if checking in self.checked:
                checked_of_mine[checking] = i[1]
                if (self.dist[(start, checking)] + i[1]) < tempdist:
                    tempdist = self.dist[(start, checking)] + i[1]  # find the shorter dist
                    tempTarget = checking
            else:
                self.checklist.append(i)
        self.dist[(start, checkPoint)] = tempdist
        self.path[(start, checkPoint)] = self.path[(start, tempTarget)] + [checkPoint]
        self.checked[checkPoint] = 1
        # recheck the checked points to see if any shorter path
        del checked_of_mine[tempTarget]  # remove the one that in the path to checkPoint
        for i in checked_of_mine:
            if self.dist[(start, checkPoint)] + checked_of_mine[i] < self.dist[(start, i)]:
                self.dist[(start, i)] = self.dist[(start, checkPoint)] + checked_of_mine[i]
                self.path[(start, i)] = self.path[(start, checkPoint)] + [i]

'''
Dij().dij()
t=Tree()
res=t.build_tree()
print(res[1])
'''


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):  # this is the server to handle all scratch client requests

    DEEP_FIRST = '/DeepFirst'
    FROM = 'from'
    TO = 'to'

    tree = Tree()

    def deepFirst(self):

        length = int(self.headers['Content-Length'])
        b = self.rfile.read(length)
        print(b.decode('UTF-8'))
        input = json.loads(b.decode('UTF-8'))


        start = input[0]
        dest = input[-1]


        res = self.tree.build_tree(start,dest)
        output ={'res':False,'wrongCity':'','correctpath':[]}
        for i in range(1,len(input)-1):
            if input[i] != res[1][i]:
                output['res'] = False
                output['wrongCity']=input[i]
                output['correctpath']=res[1]
                break
            elif i == len(input)-2:
                output['res'] = True


        print(json.dumps(output))
        return json.dumps(output)

    def do_OPTIONS(self):
        self.send_response(200,'ok')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()




    def do_POST(self):
        print(self.path)

        if self.path == self.DEEP_FIRST:  # deep first
            self.reply(self.deepFirst())


    def reset(self):
        print('empty reset')

    # httpd.charAssignment = {} # stores the character, and it's IP, pendingAction list; the key is the character name, e.g. 1/2/3...
    # httpd.allChars = ('a','b','c')#all available chars for selection
    # httpd.selectedChars =[] #a list to store selected chars
    # httpd.movingCharIndex = 0 # the index of the char that is moving at the moment, pls note it's index, not the char itself

    def reply(self, strOut):  # format and send out response
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin','*')
        self.end_headers()
        print('replying:', strOut)
        self.wfile.write(strOut.encode('UTF-8'))

    def log_message(self, format, *args):
        return


httpd = HTTPServer(('localhost', 9999), SimpleHTTPRequestHandler)
httpd.serve_forever()


