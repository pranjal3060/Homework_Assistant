from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from hwh import create_output

app = Flask(__name__)
api = Api(app)
CORS(app)

# array = [
#     {"question": "King James died in ___", "answer": "1620"},
#     {"question": "I like ___", "answer": "pizza"},
#     {"question": "Nico is ___", "answer": "cool"},
#     {"question": "Cata ___", "answer": "lit"},
#     {"question": "Reading from the ___", "answer": "server"},
# ]
array = []


class Getter(Resource):
    def get(self):
        global array
        return array
        
class Poster(Resource): 
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("string")
        args = parser.parse_args()
        global array
        array = create_output(args["string"])
        return array
        #test = args["string"].split()
        # answer = test[0]
        # test[0] = "___"
        # newThing = " ".join(test)
        # obj = {"question": newThing, "answer": answer}
        # return obj
        
api.add_resource(Getter, "/get")
api.add_resource(Poster, "/post")
app.run(debug=True)
