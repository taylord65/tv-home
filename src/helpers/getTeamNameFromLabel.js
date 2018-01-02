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
	    case 'Philadelphia 76ers':
	    	return 'PHI';
	    case 'Cleveland Cavaliers':
	    	return 'CLE';
	    case 'Detroit Pistons':
	    	return 'DET';
	    case 'Indiana Pacers':
	    	return 'IND';
	    case 'Atlanta Hawks':
	    	return 'ATL';
	    case 'Charlotte Hornets':
	    	return 'CHA';
	    case 'Miami Heat':
	    	return 'MIA';
	    case 'Washington Wizards':
	    	return 'WAS';
	    case 'Denver Nuggets':
	    	return 'DEN';
	    case 'Oklahoma City Thunder':
	    	return 'OKC';
	    case 'Utah Jazz':
	    	return 'UTH';
	    case 'Golden State Warriors':
	    	return 'GSW';
	    case 'Los Angeles Clippers':
	    	return 'LAC';
	    case 'Phoenix Suns':
	    	return 'PHX';
	    case 'Sacramento Kings':
	    	return 'SAC';
	    case 'Dallas Mavericks':
	    	return 'DAL';
	    case 'Houston Rockets':
	    	return 'HOU';
	    case 'Memphis Grizzlies':
	    	return 'MEM';
	    case 'New Orleans Pelicans':
	    	return 'NO';
	    case 'San Antonio Spurs':
	    	return 'SAS';
	    default:
	    	return '';
	}
}