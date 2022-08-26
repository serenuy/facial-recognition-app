import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='white f3'>
				{name+', your entry count is '+entries}
				<p>Earn more entries by uploading more images!</p>
			</div>
		</div>
		);
}

export default Rank;