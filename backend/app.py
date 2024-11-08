from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

projects = {
    "1": {"name": "Project Name 1", "hwSet1": {"available": 50, "total": 100}, "hwSet2": {"available": 0, "total": 100}, "authorized": True},
    "2": {"name": "Project Name 2", "hwSet1": {"available": 50, "total": 100}, "hwSet2": {"available": 0, "total": 100}, "authorized": True},
    "3": {"name": "Project Name 3", "hwSet1": {"available": 0, "total": 100}, "hwSet2": {"available": 0, "total": 100}, "authorized": False},
}

@app.route('/projects', methods=['GET'])
def get_projects():
    return jsonify(projects)

@app.route('/checkin/<int:projectId>/<string:hwSet>/<int:qty>', methods=['POST'])
def checkIn_hardware(projectId, hwSet, qty):
    projectId = str(projectId)
    if projectId not in projects:
        return jsonify({"error": "Project not found"}), 404

    if hwSet not in ['hwSet1', 'hwSet2']:
        return jsonify({"error": "Invalid hardware set"}), 400

    project = projects[projectId]
    if not project['authorized']:
        return jsonify({"error": "Project not authorized"}), 403

    hw = project[hwSet]
    if hw['available'] + qty > hw['total']:
        return jsonify({"error": "Cannot check in more than total hardware"}), 400

    hw['available'] += qty
    return jsonify({"message": f"{qty} hardware checked in for project {projectId} in {hwSet}"}), 200

@app.route('/checkout/<int:projectId>/<string:hwSet>/<int:qty>', methods=['POST'])
def checkOut_hardware(projectId, hwSet, qty):
    projectId = str(projectId)
    if projectId not in projects:
        return jsonify({"error": "Project not found"}), 404

    if hwSet not in ['hwSet1', 'hwSet2']:
        return jsonify({"error": "Invalid hardware set"}), 400

    project = projects[projectId]
    if not project['authorized']:
        return jsonify({"error": "Project not authorized"}), 403

    hw = project[hwSet]
    if qty > hw['available']:
        return jsonify({"error": "Not enough hardware available to check out"}), 400

    hw['available'] -= qty
    return jsonify({"message": f"{qty} hardware checked out for project {projectId} from {hwSet}"}), 200

@app.route('/join/<int:projectId>', methods=['POST'])
def joinProject(projectId):
    projectId = str(projectId)
    if projectId not in projects:
        return jsonify({"error": "Project not found"}), 404

    projects[projectId]['authorized'] = True
    return jsonify({"message": f"Joined project {projectId}"}), 200

@app.route('/leave/<int:projectId>', methods=['POST'])
def leaveProject(projectId):
    projectId = str(projectId)
    if projectId not in projects:
        return jsonify({"error": "Project not found"}), 404

    projects[projectId]['authorized'] = False
    return jsonify({"message": f"Left project {projectId}"}), 200

if __name__ == '__main__':
    app.run(debug=True)
