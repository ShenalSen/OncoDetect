from flask import Flask,request,jsonify


app = Flask(__name__)


@app.route('/login',methods=['POST'])
def Login():
    data=request.get_json()

    username=data.get('Username')
    password=data.get('Password')

    if username == 'User' and password == 'User123':
        print("Success")
        return jsonify({'message':'login successful'}),200
    
    else:
        print("Invalid")
        return jsonify({'Error':'Invalid'}),401








if __name__ == '__main__':
    app.run(debug = True)

