const apiKey = 'KXeIjEz53qZ5SY9zWu3LgCwcTEGqa8VbS9zVJjlF';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
const newsApiUrl = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=5';

async function fetchSpaceData() {
    try {
        // Fetch Astronomy Picture of the Day (APOD) data
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update hero section with APOD data
        const heroSection = document.getElementById('hero');
        heroSection.style.backgroundImage = `url(${data.hdurl})`;

        const heroText = document.createElement('div');
        heroText.innerHTML = `
            <h2>Image of the Day</h2>
            <p>${data.title}</p>
        `;
        heroSection.appendChild(heroText);

        // Fetch space news articles
        const newsResponse = await fetch(newsApiUrl);
        const newsData = await newsResponse.json();

        const newsSection = document.getElementById('news');
        newsSection.innerHTML = '<h2>Space News</h2>';

        newsData.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsSection.appendChild(articleElement);
        });

        // Display APOD explanation as the "Quote of the Day"
        const quoteSection = document.getElementById('quote');
        quoteSection.innerHTML = `
            <h2>Quote of the Day</h2>
            <p>${data.explanation}</p>
        `;
    } catch (error) {
        console.error('Error fetching space data:', error);
    }
}

fetchSpaceData();