import axios from 'axios';

export default function getStreams(self, res) {

	let posts = res.data.data.children;

	//posts are the stream posts in the subreddit

	for (var f = posts.length - 1; f >= 0; f--) {

		//If its a game thread stream, get the comments
		
		if(posts[f].data.title.indexOf("Game Thread") !== -1){

			var clip1 = 'Game Thread: ';
			var clip2 = ' @ ';
			var gameThreadName = posts[f].data.title;


			var clabel = gameThreadName.match(new RegExp(clip1 + "(.*)" + clip2))[1]; 

			console.log(clabel);//Toronto Raptors


	        axios.get(posts[f].data.url + ".json?")
	        .then(res => {

	        	//...Grab the first comment which contains the verified streams

				let html = res.data[1].data.children[0].data.body_html;

				//Isolate the url for the stream
				let sClip1 = "www.genti.stream/";
				let sClip2 = ".php";

			    let urlPath = html.match(new RegExp(sClip1 + "(.*)" + sClip2))[0];

			    //console.log(urlPath);

			    let url = sClip1 + urlPath + sClip2;

				for (var l = self.state.nbaData.length - 1; l >= 0; l--) {

					console.log(self.state.nbaData[l]);

					if( (clabel.indexOf(self.state.nbaData[l].teamA.label) !== -1) || 
						(clabel.indexOf(self.state.nbaData[l].teamH.label) !== -1)){
						self.state.nbaData[l].url = url;
					}
				};

	        })
	        .catch(function(error){
	          console.log("Error getting stream posts");
	        });
		}
	};

	console.log(self.state.nbaData);		
}
