const isSuccess = (response) => {
	return !(response.logs.length && response.logs[0].event === 'Status')
}

export default isSuccess;