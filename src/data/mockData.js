// Mock data for initial setup, will be largely replaced by Firestore
export const initialMockUsers = {
    'currentuser': { 
        id: 'currentuser', user: 'SportySphere User', avatar: 'https://placehold.co/32x32/22C55E/FFFFFF?text=S', verificationTier: 'fan', cover: 'https://placehold.co/1200x400/22C55E/FFFFFF?text=My+SportSphere+Cover', bio: 'Passionate sports fan and analyst.', joined: 'July 2025', location: 'Global', website: '', stats: { posts: '0', followers: '0', following: '0' },
        role: 'fan', // Default role for new users
        interactions: 0 // For fan badge logic
    },
    'espn': { id: 'espn', user: 'ESPN Official', avatar: 'https://placehold.co/32x32/FF0000/FFFFFF?text=E', verificationTier: 'reporter', bio: 'Your source for the latest sports news and highlights.', joined: 'Jan 2020', location: 'Global', website: 'espn.com', stats: { posts: '1.2M', followers: '50M', following: '120' }, role: 'reporter',
        background: 'Leading sports news network.', company: 'ESPN Inc.', reporterStats: { 'Articles Published': 5000, 'Breaking News Scoops': 150 }
    },
    'kingjames': { id: 'kingjames', user: 'LeBron James', avatar: 'https://placehold.co/32x32/58187A/FFFFFF?text=LJ', verificationTier: 'player', bio: 'Just a kid from Akron. #StriveForGreatness', joined: 'Oct 2012', location: 'Los Angeles, USA', website: 'lebronjames.com', stats: { posts: '2K', followers: '120M', following: '300' }, role: 'player',
        currentTeam: 'Los Angeles Lakers', playerDetails: { 'Position': 'Small Forward', 'Height': '6\'9"', 'Weight': '250 lbs' },
        matchStats: { 'PPG': 25.3, 'RPG': 7.5, 'APG': 7.3, 'Championships': 4 },
        achievements: ['4x NBA Champion', '4x NBA MVP', '4x Finals MVP'],
        achievementsPercentage: { 'Field Goal %': '50.4%', '3-Point %': '34.5%', 'Free Throw %': '73.4%' },
        sponsors: ['Nike', 'McDonald\'s', 'PepsiCo']
    },
    'manutd': { id: 'manutd', user: 'Manchester United', avatar: 'https://placehold.co/32x32/DA291C/FFFFFF?text=MU', verificationTier: 'team', bio: 'Official account of Manchester United Football Club. Theatre of Dreams.', joined: 'Aug 2010', location: 'Manchester, UK', website: 'manutd.com', stats: { posts: '5K', followers: '80M', following: '50' }, role: 'team',
        history: 'Founded in 1878, one of the most successful football clubs in the world.',
        achievements: ['20x English League Titles', '12x FA Cups', '3x UEFA Champions League'],
        teamStats: { 'Wins': 1500, 'Draws': 500, 'Losses': 400, 'Goals Scored': 4500 }
    },
    'nike': { id: 'nike', user: 'Nike', avatar: 'https://placehold.co/32x32/000000/FFFFFF?text=N', verificationTier: 'sponsor', bio: 'Innovating for athletes everywhere. Just Do It.', joined: 'Apr 2015', location: 'Beaverton, USA', website: 'nike.com', stats: { posts: '1K', followers: '90M', following: '100' }, role: 'sponsor',
        company: 'Nike Inc.', background: 'Global leader in athletic footwear, apparel, equipment, and accessories.',
        sponsors: ['LeBron James', 'Cristiano Ronaldo', 'Tiger Woods']
    },
    'cr7': { id: 'cr7', user: 'Cristiano Ronaldo', avatar: 'https://placehold.co/32x32/006600/FFFFFF?text=CR7', verificationTier: 'player', bio: 'Living the dream. #AlwaysBelieve', joined: 'Feb 2014', location: 'Riyadh, Saudi Arabia', website: 'cristianoronaldo.com', stats: { posts: '1.5K', followers: '600M', following: '0' }, role: 'player',
        currentTeam: 'Al Nassr FC', playerDetails: { 'Position': 'Forward', 'Height': '6\'2"', 'Weight': '183 lbs' },
        matchStats: { 'Goals': 890, 'Assists': 250, 'Hat-tricks': 65, 'Ballon d\'Or': 5 },
        achievements: ['5x UEFA Champions League Winner', 'European Championship Winner', 'UEFA Nations League Winner'],
        achievementsPercentage: { 'Shots on Target %': '45%', 'Pass Accuracy %': '80%', 'Penalty Conversion %': '90%' },
        sponsors: ['Nike', 'Herbalife', 'Clear']
    },
    'patmcafee': { id: 'patmcafee', user: 'Pat McAfee', avatar: 'https://placehold.co/32x32/FFFF00/000000?text=PM', verificationTier: 'analyst', bio: 'For the Brand! Host of The Pat McAfee Show.', joined: 'Sept 2019', location: 'Indiana, USA', website: 'patmcafeeshow.com', stats: { posts: '800', followers: '3M', following: '500' }, role: 'analyst',
        background: 'Former NFL punter turned sports analyst and media personality.', company: 'The Pat McAfee Inc.',
        analystStats: { 'Show Episodes': 1000, 'Interviews Conducted': 300, 'Audience Reach (M)': 10 }
    },
    'wojespn': { id: 'wojespn', user: 'Adrian Wojnarowski', avatar: 'https://placehold.co/32x32/1DA1F2/FFFFFF?text=Woj', verificationTier: 'reporter', bio: 'ESPN NBA Insider. Woj Bomb Incoming.', joined: 'Sept 2017', location: 'Global', website: 'espn.com', stats: { posts: '4K', followers: '10M', following: '150' }, role: 'reporter',
        background: 'Premier NBA news breaker and journalist.', company: 'ESPN Inc.',
        reporterStats: { 'Breaking News Scoops': 500, 'Exclusive Interviews': 100, 'Twitter Followers (M)': 10 }
    },
    'ffguru': { id: 'ffguru', user: 'Fantasy Football Guru', avatar: 'https://placehold.co/32x32/008000/FFFFFF?text=FG', verificationTier: 'fan', bio: 'Helping you win your fantasy league one waiver wire pickup at a time. #FantasyFootball', joined: 'July 2021', location: 'Online', website: 'fantasyfootballguru.com', stats: { posts: '300', followers: '500K', following: '200' }, role: 'fan',
        interactions: 10 // Example of a fan with enough interactions for badge
    },
};

export const mockStories = [
    { id: 1, userId: 'espn', imageUrl: 'https://placehold.co/1080x1920/333/FFF?text=BREAKING+NEWS', viewed: false },
    { id: 2, userId: 'kingjames', imageUrl: 'https://placehold.co/1080x1920/58187A/FFF?text=Game+Day', viewed: false },
    { id: 3, userId: 'manutd', imageUrl: 'https://placehold.co/1080x1920/FFE500/000?text=Match+Day+Live!', viewed: true },
    { id: 4, userId: 'nike', imageUrl: 'https://placehold.co/1080x1920/FFFFFF/000?text=Just+Do+It.', viewed: false },
];

// Mock data for videos, will not be stored in Firestore for this update due to size/complexity
export const mockVideos = [
    { id: 1, platform: 'TikTok', userId: 'patmcafee', content: 'This league is absolutely WILD right now!', likes: 50000, comments: 2000, shares: 15000, videoUrl: 'https://placehold.co/338x600/111/fff?text=WILD', videoType: 'reel', sound: { name: 'Original Sound', author: 'patmcafee' } },
    { id: 2, platform: 'YouTube', userId: 'espn', content: 'NBA Finals Game 7 Highlights!', likes: 120000, comments: 5000, shares: 20000, videoUrl: 'https://placehold.co/600x338/FF0000/FFFFFF?text=NBA+Highlights', videoType: 'highlight', sound: { name: 'Epic Sport Rock', author: 'StockMusic' } },
    { id: 3, platform: 'Twitch', userId: 'ffguru', content: 'Live Draft Analysis Stream!', likes: 15000, comments: 1000, shares: 500, videoUrl: 'https://placehold.co/600x338/6441A5/FFFFFF?text=Live+Stream', videoType: 'live', sound: { name: 'Stadium Sounds', author: 'Old Trafford' } },
    { id: 4, platform: 'Instagram', userId: 'kingjames', content: 'Workout grind never stops. #StriveForGreatness', likes: 800000, comments: 15000, shares: 30000, videoUrl: 'https://placehold.co/600x600/FDB927/000000?text=Workout', videoType: 'reel', sound: { name: 'Pump Up Anthem', author: 'GymBeats' } },
    { id: 5, platform: 'SportSphere', userId: 'espn', content: 'Breaking News: Star Player Traded!', likes: 50000, comments: 2000, shares: 15000, videoUrl: 'https://placehold.co/600x338/333/FFF?text=NEWS+UPDATE', videoType: 'news', sound: { name: 'Urgent News Jingle', author: 'NewsRoom' } },
    { id: 6, platform: 'YouTube', userId: 'manutd', content: 'Top 10 Goals of the Season!', likes: 200000, comments: 8000, shares: 10000, videoUrl: 'https://placehold.co/600x338/DA291C/FFFFFF?text=Top+Goals', videoType: 'highlight', sound: { name: 'Football Anthem', author: 'GoalMusic' } },
    { id: 7, platform: 'TikTok', userId: 'cr7', content: 'Skills and Drills! ⚽', likes: 3000000, comments: 50000, shares: 100000, videoUrl: 'https://placehold.co/338x600/000000/FFFFFF?text=Skills', videoType: 'reel', sound: { name: 'Drill Beat', author: 'CR7Mix' } },
    { id: 8, platform: 'SportSphere', userId: 'nike', content: 'New Collection Launch Event!', likes: 100000, comments: 3000, shares: 5000, videoUrl: 'https://placehold.co/600x338/EEEEEE/000000?text=New+Launch', videoType: 'news', sound: { name: 'Fashion Show Music', author: 'RunwaySounds' } },
    { id: 9, platform: 'Twitch', userId: 'wojespn', content: 'NBA Trade Deadline Live Coverage!', likes: 40000, comments: 2500, shares: 1000, videoUrl: 'https://placehold.co/600x338/1DA1F2/FFFFFF?text=Trade+Deadline', videoType: 'live', sound: { name: 'Breaking News Loop', author: 'WojPod' } },
    { id: 10, platform: 'YouTube', userId: 'patmcafee', content: 'My take on the latest NFL drama!', likes: 90000, comments: 4000, shares: 8000, videoUrl: 'https://placehold.co/600x338/FFFF00/000000?text=NFL+Drama', videoType: 'highlight', sound: { name: 'Talk Show Intro', author: 'McAfeeAudio' } },
    { id: 11, platform: 'SportSphere', userId: 'kingjames', content: 'Exclusive behind-the-scenes from practice!', likes: 1.5e6, comments: 25000, shares: 50000, videoUrl: 'https://placehold.co/600x338/58187A/FFFFFF?text=Practice', videoType: 'reel', sound: { name: 'Training Montage', author: 'SportBeats' } },
    { id: 12, platform: 'YouTube', userId: 'manutd', content: 'Match Day Vlog: Victory at Old Trafford!', likes: 180000, comments: 7000, shares: 9000, videoUrl: 'https://placehold.co/600x338/DA291C/FFFFFF?text=Match+Vlog', videoType: 'news', sound: { name: 'Fan Chant', author: 'UnitedVoice' } },
    { id: 13, platform: 'TikTok', userId: 'ffguru', content: 'Fantasy Football Sleepers for 2025!', likes: 30000, comments: 1500, shares: 2000, videoUrl: 'https://placehold.co/338x600/1DA1F2/FFFFFF?text=Sleepers', videoType: 'reel', sound: { name: 'Fantasy Beat', author: 'GuruTunes' } },
    { id: 14, platform: 'SportSphere', userId: 'espn', content: 'Live Post-Game Analysis: Lakers vs Celtics', likes: 70000, comments: 3000, shares: 2000, videoUrl: 'https://placehold.co/600x338/FF0000/FFFFFF?text=PostGame', videoType: 'live', sound: { name: 'Commentary Mix', author: 'ESPNRadio' } },
    { id: 15, platform: 'YouTube', userId: 'cr7', content: 'My Journey: From Lisbon to Riyadh', likes: 5e6, comments: 100000, shares: 200000, videoUrl: 'https://placehold.co/600x338/006600/FFFFFF?text=Journey', videoType: 'highlight', sound: { name: 'Inspirational Score', author: 'CR7Films' } },
    { id: 16, platform: 'SportSphere', userId: 'patmcafee', content: 'Exclusive Interview with a Super Bowl MVP!', likes: 120000, comments: 6000, shares: 10000, videoUrl: 'https://placehold.co/600x338/FFFF00/000000?text=Interview', videoType: 'news', sound: { name: 'Interview Background', author: 'PodcastPro' } },
    { id: 17, platform: 'Instagram', userId: 'nike', content: 'Behind the Design: New Football Boots!', likes: 400000, comments: 15000, shares: 25000, videoUrl: 'https://placehold.co/600x600/EEEEEE/000000?text=Boots', videoType: 'reel', sound: { name: 'Design Reveal', author: 'NikeAudio' } },
    { id: 18, platform: 'Twitch', userId: 'espn', content: 'Fantasy Football Draft Day Live!', likes: 60000, comments: 4000, shares: 1500, videoUrl: 'https://placehold.co/600x338/FF0000/FFFFFF?text=Draft+Day', videoType: 'live', sound: { name: 'Breaking News Alert', author: 'WojSound' } },
    { id: 19, platform: 'YouTube', userId: 'kingjames', content: 'My Top 5 Dunks of All Time!', likes: 2.8e6, comments: 60000, shares: 120000, videoUrl: 'https://placehold.co/600x338/58187A/FFFFFF?text=Top+Dunks', videoType: 'highlight', sound: { name: 'Dunk Mix', author: 'KingJamesMix' } },
    { id: 20, platform: 'SportSphere', userId: 'manutd', content: 'Pre-Season Training Camp Update!', likes: 90000, comments: 3500, shares: 4000, videoUrl: 'https://placehold.co/600x338/DA291C/FFFFFF?text=Training+Update', videoType: 'news', sound: { name: 'Training Ground Vibes', author: 'MUFCAudio' } },
    { id: 21, platform: 'TikTok', userId: 'wojespn', content: 'Woj Bomb: Another blockbuster trade incoming!', likes: 180000, comments: 10000, shares: 5000, videoUrl: 'https://placehold.co/338x600/1DA1F2/FFFFFF?text=Woj+Bomb', videoType: 'reel', sound: { name: 'Breaking News Alert', author: 'WojSound' } },
    { id: 22, platform: 'YouTube', userId: 'ffguru', content: 'Week 1 Matchup Previews & Predictions!', likes: 45000, comments: 2000, shares: 1800, videoUrl: 'https://placehold.co/600x338/008000/FFFFFF?text=Previews', videoType: 'news', sound: { name: 'Prediction Jingle', author: 'FFGTunes' } },
    { id: 23, platform: 'SportSphere', userId: 'cr7', content: 'Training session with the squad!', likes: 2.1e6, comments: 40000, shares: 80000, videoUrl: 'https://placehold.co/600x338/006600/FFFFFF?text=Squad+Training', videoType: 'live', sound: { name: 'Training Ground Ambience', author: 'CR7Sounds' } },
    { id: 24, platform: 'Instagram', userId: 'espn', content: 'Behind the Scenes: College Football Gameday!', likes: 300000, comments: 10000, shares: 15000, videoUrl: 'https://placehold.co/600x600/FF0000/FFFFFF?text=Gameday', videoType: 'reel', sound: { name: 'Gameday Hype', author: 'ESPNBeats' } },
    { id: 25, platform: 'YouTube', userId: 'nike', content: 'Innovating for Athletes: The Future of Sportswear', likes: 70000, comments: 2500, shares: 3000, videoUrl: 'https://placehold.co/600x338/000000/FFFFFF?text=Innovation', videoType: 'highlight', sound: { name: 'Innovation Soundscape', author: 'NikeLabs' } },
];

export const initialLiveGames = [
    { id: 1, sport: 'NBA', team1: 'Lakers', team2: 'Celtics', score1: 88, score2: 85, time: "4Q 2:12", odds: { team1: -150, team2: +130, total: 210.5 }, stats: { team1: { 'FG%': '45.2', '3P%': '33.3', 'FT%': '78.9', 'Rebounds': 45, 'Assists': 22, 'Turnovers': 12 }, team2: { 'FG%': '42.1', '3P%': '30.1', 'FT%': '81.2', 'Rebounds': 48, 'Assists': 18, 'Turnovers': 15 }, topPerformers: [{name: 'LeBron James', pts: 32, reb: 8, ast: 9}, {name: 'Jayson Tatum', pts: 28, reb: 12, ast: 5}] } },
    { id: 2, sport: 'Soccer', team1: 'Man Utd', team2: 'Liverpool', score1: 1, score2: 0, time: "HT", odds: { team1: +120, draw: +250, team2: +200 }, stats: { team1: { 'Possession': '55%', 'Shots': 10, 'Shots on Target': 5, 'Corners': 3, 'Fouls': 7 }, team2: { 'Possession': '45%', 'Shots': 8, 'Shots on Target': 3, 'Corners': 5, 'Fouls': 5 }, topPerformers: [{name: 'Bruno Fernandes', goals: 1, assists: 0}, {name: 'Mohamed Salah', goals: 0, assists: 0}] } },
];

export const mockLiveBets = [
    {
        id: 1,
        sport: 'NBA',
        match: 'Lakers vs Celtics',
        market: 'Next Point Scorer',
        options: [{ player: 'LeBron James', odds: -110.55 }, { player: 'Jayson Tatum', odds: +100.25 }],
        time: 'Live',
        allMarkets: [
            { name: 'Game Winner', type: 'moneyline', options: [{ name: 'Lakers', odds: -150 }, { name: 'Celtics', odds: +130 }] },
            { name: 'Total Points', type: 'over_under', options: [{ name: 'Over 210.5', odds: -110 }, { name: 'Under 210.5', odds: -110 }] },
            { name: 'Player Points (LeBron James)', type: 'player_prop', options: [{ name: 'Over 30.5', odds: -120 }, { name: 'Under 30.5', odds: +100 }] },
            { name: 'Next Field Goal', type: 'next_event', options: [{ name: 'Lakers', odds: -115 }, { name: 'Celtics', odds: -105 }] },
        ]
    },
    {
        id: 2,
        sport: 'Soccer',
        match: 'Man Utd vs Liverpool',
        market: 'Next Goal Scorer',
        options: [{ player: 'Marcus Rashford', odds: +250.75 }, { player: 'Darwin Nunez', odds: +300.10 }],
        time: 'Live',
        allMarkets: [
            { name: 'Match Result', type: 'moneyline', options: [{ name: 'Man Utd', odds: +120 }, { name: 'Draw', odds: +250 }, { name: 'Liverpool', odds: +200 }] },
            { name: 'Total Goals', type: 'over_under', options: [{ name: 'Over 2.5', odds: -130 }, { name: 'Under 2.5', odds: +110 }] },
            { name: 'Both Teams to Score', type: 'yes_no', options: [{ name: 'Yes', odds: -160 }, { name: 'No', odds: +140 }] },
            { name: 'Next Corner Kick', type: 'next_event', options: [{ name: 'Man Utd', odds: -110 }, { name: 'Liverpool', odds: -110 }] },
        ]
    },
    {
        id: 3,
        sport: 'Tennis',
        match: 'Djokovic vs Alcaraz',
        market: 'Set 3 Winner',
        options: [{ player: 'Djokovic', odds: -180.30 }, { player: 'Alcaraz', odds: +150.80 }],
        time: 'Live',
        allMarkets: [
            { name: 'Match Winner', type: 'moneyline', options: [{ name: 'Djokovic', odds: -200 }, { name: 'Alcaraz', odds: +170 }] },
            { name: 'Total Games in Set 3', type: 'over_under', options: [{ name: 'Over 9.5', odds: -110 }, { name: 'Under 9.5', odds: -110 }] },
            { name: 'Next Game Winner', type: 'player_prop', options: [{ name: 'Djokovic', odds: -140 }, { name: 'Alcaraz', odds: +120 }] },
        ]
    },
];

export const shopTeams = [
    { id: 'yanga', name: 'Young Africans SC', logo: 'https://images.seeklogo.com/logo-png/49/1/young-africans-sc-logo-png_seeklogo-490860.png', membershipTiers: [{ name: 'Bronze', duration: '1 Month', price: 10000 }, { name: 'Silver', duration: '6 Months', price: 50000 }, { name: 'Gold', duration: '1 Year', price: 90000 }] },
    { id: 'simba', name: 'Simba SC', logo: 'https://simbasc.co.tz/storage/2019/01/simba.png', membershipTiers: [{ name: 'Fan', duration: '1 Month', price: 12000 }, { name: 'Pro', duration: '1 Year', price: 100000 }] },
    { id: 'azam', name: 'Azam FC', logo: 'https://img.sofascore.com/api/v1/team/212411/image', membershipTiers: [{ name: 'Standard', duration: '1 Year', price: 75000 }] },
];

export const shopMatches = [
    { id: 1, date: '2025-07-28', time: '17:00', homeTeamId: 'yanga', awayTeamId: 'simba', status: 'Upcoming' },
    { id: 2, date: '2025-07-29', time: '19:00', homeTeamId: 'azam', awayTeamId: 'yanga', status: 'Upcoming' },
];

export const getTeamName = (id) => shopTeams.find(t => t.id === id)?.name || 'Unknown Team';

export const shopProducts = [
    { id: 'yanga_jersey_home', name: 'Young Africans Home Jersey 23/24', price: 75000, image: 'https://placehold.co/400x400/16a34a/ffffff?text=Yanga+Jersey', type: 'merchandise', colors: ['Green', 'Yellow'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 'simba_jersey_home', name: 'Simba SC Home Jersey 23/24', price: 75000, image: 'https://placehold.co/400x400/ef4444/ffffff?text=Simba+Jersey', type: 'merchandise', colors: ['Red', 'White'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 'azam_jersey_home', name: 'Azam FC Home Jersey 23/24', price: 65000, image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Azam+Jersey', type: 'merchandise', colors: ['Blue', 'White'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 'taifa_stars_scarf', name: 'Taifa Stars Supporter Scarf', price: 25000, image: 'https://placehold.co/400x400/facc15/000000?text=Taifa+Scarf', type: 'merchandise', colors: ['Yellow', 'Green'], sizes: ['One Size'] },
    ...shopMatches.filter(m => m.status === 'Upcoming').map(m => ({
        id: `ticket_${m.id}`, name: `Ticket: ${getTeamName(m.homeTeamId)} vs ${getTeamName(m.awayTeamId)}`,
        price: { 'VIP': 30000, 'Regular': 15000 }, image: `https://placehold.co/400x400/22c55e/ffffff?text=Ticket`, type: 'ticket'
    }))
];

export const azamTvData = {
    hardware: [
        { id: 'azam_kit', name: 'Full Decoder Kit', price: 150000, image: 'https://placehold.co/400x400/00aef0/ffffff?text=Azam+Kit', description: 'Complete kit including decoder, dish, LNB, and remote.' },
        { id: 'azam_decoder', name: 'Decoder Only', price: 95000, image: 'https://placehold.co/400x400/00aef0/ffffff?text=Decoder', description: 'High-definition digital satellite receiver.' },
    ],
    subscriptions: [
        { id: 'sub_basic_1m', name: 'Basic', duration: '1 Month', price: 20000 },
        { id: 'sub_premium_1y', name: 'Premium', duration: '1 Year', price: 500000 },
    ]
};

export const bestOffers = [
    { id: 'offer_jersey_bundle', name: 'Team Jersey + Scarf Bundle', originalPrice: 100000, offerPrice: 85000, image: 'https://placehold.co/400x400/16a34a/ffffff?text=Bundle', description: 'Get any team jersey and a Taifa Stars scarf together for a special price!' },
    { id: 'offer_azam_premium', name: 'AzamTV Premium 3-Month Offer', originalPrice: 135000, offerPrice: 100000, image: 'https://placehold.co/400x400/00aef0/ffffff?text=AzamTV+Offer', description: 'Enjoy 3 months of AzamTV Premium at a discounted rate!' },
];