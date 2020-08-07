import React, { useState } from 'react';

const usePagination = (data, itemsPerPage) => {
	const [currentPage, setCurrentPage] = useState(1);
	const maxPage = Math.ceil(data.length / itemsPerPage)

	const currentData = () => {
		const begin = (currentPage - 1) * itemsPerPage;
		const end = begin + itemsPerPage;
		return data.slice(begin, end)
	}

	return {setCurrentPage, currentData, currentPage, maxPage };
}

export default usePagination