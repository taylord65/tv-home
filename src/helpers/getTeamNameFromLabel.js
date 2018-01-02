export default function getTeamNameFromLabel(label){

	switch(label) {
	    case 'Boston Celtics':
	        return 'BOS';
	    case 'Brooklyn Nets':
	        return 'BKN';
	    case 'New York Knicks':
	        return 'NYK';
	    case 'Los Angeles Lakers':
	        return 'LAL';
	    case 'Minnesota Timberwolves':
	    	return 'MIN';
	    case 'Portland Trail Blazers':
	    	return 'POR';
	    case 'Chicago Bulls':
	    	return 'CHI';
	    case 'Milwaukee Bucks':
	    	return 'MIL';
	    case 'Toronto Raptors':
	    	return 'TOR';
	    case 'Orlando Magic':
	    	return 'ORL';
	    default:
	    	return '';
	}
}