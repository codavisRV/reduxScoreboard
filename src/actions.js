export function storeYardage(text) {
    return {
        type: "STORE_YARDAGE",
        text
    }
}

export function submitDrive(driveSummary, increment) {
    return {
        type: 'SUBMIT_DRIVE',
        driveSummary,
        increment
    }
}
