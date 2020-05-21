

const runOperation = async (operation, backoffDurationMilliseconds, maximumBackoffMilliseconds, jitter) => {
    let roundBackoff = backoffDurationMilliseconds + (Math.floor(Math.random() * jitter) - (jitter/2));

    if (roundBackoff < maximumBackoffMilliseconds) {
        console.log('round backoff milliseconds', roundBackoff);

        operation().then((value) => {
            console.log('Operation successful.');
            return;
        }).catch(() => {
            console.log('Failed, retrying...');
            setTimeout(() => {
                runOperation(operation, backoffDurationMilliseconds*2, maximumBackoffMilliseconds, jitter);
            }, roundBackoff);
        });
    } else {
        console.log('Operation unsuccessful, with no more attempts being made.');
        return;
    }
};

/* Failing Operation Test */

const failingOp = async () => {
    let result = new Promise((resolve, reject) => {
        if (1 + 1 == 3) {
            console.log('Math broke.');
            resolve('Failing operation is a success.');
        } else {
            reject('Failing operation failed.');
        }
    });

    return result;
};

failingOpTest = () => {
    console.log('Failing Operation Test');
    console.log('---');

    runOperation(failingOp, 1000, 8000, 200);
};
// failingOpTest();

/* Working Operation Test */

const workingOp = () => {
    let result = new Promise((resolve, reject) => {
        if (1 + 1 == 2) {
            resolve('Success');
        } else {
            console.log('Math broke.');
            reject('Failed');
        }
    });

    return result;
};

workingOpTest = async () => {
    console.log('Working Operation Test');
    console.log('---');

    await runOperation(workingOp, 1000, 8000, 200);
}
// workingOpTest();

/* Conditionally Working Operation Test */

let counter = 0;

const condWorkingOp = () => {
    return new Promise((resolve, reject) => {
        if (counter == 1) {
            resolve('Success');
        } else {
            counter++;
            reject('Failed');
        }
    });
}

condWorkingOpTest = async () => {
    console.log('Conditionally Working Operation Test');
    console.log('---');

    await runOperation(condWorkingOp, 1000, 8000, 200);
}
// condWorkingOpTest();
