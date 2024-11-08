from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/checkin/<int:projectId>/<int:qty>', methods=['POST'])
def checkIn_hardware(projectId, qty):
    return jsonify({"message": f"{qty} hardware checked in for project {projectId}"}), 200

@app.route('/checkout/<int:projectId>/<int:qty>', methods=['POST'])
def checkOut_hardware(projectId, qty):
    return jsonify({"message": f"{qty} hardware checked out for project {projectId}"}), 200

@app.route('/join/<int:projectId>', methods=['POST'])
def joinProject(projectId):
    return jsonify({"message": f"Joined project {projectId}"}), 200

@app.route('/leave/<int:projectId>', methods=['POST'])
def leaveProject(projectId):
    return jsonify({"message": f"Left project {projectId}"}), 200

if __name__ == '__main__':
    app.run(debug=True)