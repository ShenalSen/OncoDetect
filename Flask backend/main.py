from flask import Flask,request,jsonify

app=Flask(__name__)

@app.route('/login',methods=['POST'])
def Login():
    data=request.get_json()

    Username=data.get('Username')
    Password=data.get('Password')


    if Username== 'User' and Password=='User123':
        return jsonify({'message':'Login successful'}),200
    else:
        return jsonify({'message':'Login failed'}),401
    
if  __name__=="__main__":
     app.run(debug=True, host='0.0.0.0', port=5000)   