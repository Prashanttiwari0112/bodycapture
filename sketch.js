let capture;
let posenet;
let singlePose;
let skeleton;
function setup() {
    createCanvas(700, 480);
    capture = createCapture(VIDEO);
    capture.hide();
    posenet= ml5.poseNet(capture, modelLoaded);
    posenet.on("pose", receivedPose);
}
function modelLoaded(){
    console.log("Model Loaded!");
}
function receivedPose(poses) {
    console.log(poses);

    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }

    console.log(singlePose);

}
function draw() {
    image(capture, 0, 0, 700, 480);
    fill(255, 0, 0);

    if (singlePose) {

        for (let i = 0; i < singlePose.keypoints.length; i++) {
            let kp = singlePose.keypoints[i];

            if (kp.score > 0.5) {
                ellipse(kp.position.x, kp.position.y, 30);
            }
        }
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255, 255, 255);
            strokeWeight(4);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}