const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};


const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
        {
            id: 125,
            avg: 0.985, // (47 + 150) / (50 + 150)
            1: 0.94, // 47 / 50
            2: 1.0 // 150 / 150
        },
        {
            id: 132,
            avg: 0.82, // (39 + 125) / (50 + 150)
            1: 0.78, // 39 / 50
            2: 0.833 // late: (140 - 15) / 150
        }
    ];

    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);


// console.log(LearnerSubmissions[0].submission.score);

// console.log(AssignmentGroup[0].assignments[0].points_possible);
// const learnerData = {
//     id : LearnerSubmissions[0].learner_id ,
//     Avg : (LearnerSubmissions[0].submission.score) / (AssignmentGroup.assignments[0].points_possible)
// }

// console.log(learnerData);
// console.log(AssignmentGroup.assignments.point);
//Check for cource id data validity.
function checkAssignmentIdForValidity(assignmentGroup, courseInfo) {
    if (assignmentGroup.course_id != courseInfo.id) {
        throw new Error('Program Failed..... Course ID not present in Course Info Data. Please check.');
    } else {
        //console.log("Course ID Match..All Good");
    }
}

//Get unique learner id array.
function getUnqArrayOfLearnerID([learnerSubmissions]) {
    const unqLearnerIdArray = [];

    let unqLearnerId = 0;
    for (let i = 0; i < learnerSubmissions.length; i++) {
        //unqLearnerId=LearnerSubmissions[i].learner_id;
        if (unqLearnerId != learnerSubmissions[i].learner_id) {
            unqLearnerId = learnerSubmissions[i].learner_id;
            unqLearnerIdArray.push(unqLearnerId);
        }
    }
    return unqLearnerIdArray;
}

//function getAssignmentDetailsObject(assignmentGroup, assignMentId) {
//for (let i = 0; i < assignmentGroup.assignments.length; i++) {
//if (assignmentGroup.assignments[i].id == assignMentId) {
//return assignmentGroup.assignments[i];
//}
//}
//}

//Get the assignment details object
function getAssignmentDetailsObject(assignmentGroup, assignMentId) {
    let i = 0;
    do {
        if (assignmentGroup.assignments[i].id == assignMentId) {
            return assignmentGroup.assignments[i];
        }
        i++;
    } while (i < assignmentGroup.assignments.length)
}

//deduct marks based on late submission date.
function deductMarks(dueAtDate, submitteddate) {
    if (submitteddate > dueAtDate) {
        return 10;
    } else {
        return 0;
    }
}

//Calculate avarage for given assignment id.
function getAvarage(actualMarks, totalMarks, dueAtDate, submitteddate) {
    let val = 0;
    if (isNaN(actualMarks) || isNaN(totalMarks)) {
        throw new Error('Score  and  points_possible  must be numbers only ');
    }

    if (totalMarks == 0) {
        throw new Error('Points Possible can not be 0. Please check the input data for validity');
    }
    actualMarks = actualMarks - deductMarks(dueAtDate, submitteddate);
    try {
        val = actualMarks / totalMarks;
    } catch (error) {
        console.error(error);
    }
    return val;
}


//Construct the object array containg learner details.
function getLearnerData(courseInfo, assignmentGroup, [learnerSubmissions]) {

    let finalResultArray = [];
    //Check for input data validity for course id.
    checkAssignmentIdForValidity(assignmentGroup, courseInfo);
    let unqLearnerIdArray = getUnqArrayOfLearnerID([learnerSubmissions]);

    for (let i = 0; i < unqLearnerIdArray.length; i++) {
        let learnerID = unqLearnerIdArray[i];
        let myObject = { id: learnerID }; // create an object
        let totalActualMarks = 0;
        let totalPossibleMarks = 0;
        for (let i = 0; i < learnerSubmissions.length; i++) {
            if (learnerSubmissions[i].learner_id == learnerID) {
                let avg = getAvarage(learnerSubmissions[i].submission.score,
                    getAssignmentDetailsObject(assignmentGroup, learnerSubmissions[i].assignment_id).points_possible,
                    getAssignmentDetailsObject(assignmentGroup, learnerSubmissions[i].assignment_id).due_at,
                    learnerSubmissions[i].submission.submitted_at);
                totalActualMarks = totalActualMarks + learnerSubmissions[i].submission.score;
                totalPossibleMarks = totalPossibleMarks + getAssignmentDetailsObject(assignmentGroup, learnerSubmissions[i].assignment_id).points_possible;
                myObject[' ' + learnerSubmissions[i].assignment_id] = avg;
            } else {
                continue;
            }
        }
        myObject['avg'] = totalActualMarks / totalPossibleMarks;
        finalResultArray.push(myObject);
    }
    return finalResultArray;
}


const unqLearnerIdFinalResultArray = getLearnerData(CourseInfo, AssignmentGroup, [LearnerSubmissions]);

console.log("Program out put is ");
console.log(unqLearnerIdFinalResultArray);