// Data Mock Source
let posts = [{
        brandLogo: "./images/mailchimp.png",
        brandName: "test",
        time: "2 days ago",
        title: "test",
        progress: 30,
        applied: "33",
        capacity: "88",
        label: 'design',
    },
    {
        brandLogo: "./images/reddit.png",
        brandName: "Reddit",
        time: "3 days ago",
        title: "Reddit",
        progress: 78,
        applied: "2",
        capacity: "9",
        label: 'Product',
    },
    {
        brandLogo: "./images/dribble.png",
        brandName: "dribble",
        time: "5 days ago",
        title: "Dribble",
        progress: 55,
        applied: "8",
        capacity: "90",
        label: 'Dribble',
    },
]

const containerRow = document.querySelector('.row');
const loading = document.querySelector('.loading');
let scrollReset = 0;
// Window Scroll Source
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (((scrollTop + clientHeight) > (scrollHeight - 5)) && scrollReset === 0) {
        scrollReset = 1;
        let promise = new Promise(resolve => {
            loading.style.display = 'inline-block';
            return resolve(posts);
        });
        promise.then(response => {
            setTimeout(() => {
                for (let i = 0; i < response.length; i++) createPost(response[i])
                loading.style.display = 'none';
                scrollReset = 0;
            }, 2000);
        })
    }
});


// Post Elements Creation
let createPost = (post) => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('col-md-4');
    gridItem.appendChild(createCardItem(post))
    containerRow.appendChild(gridItem);
}

let createCardItem = (post) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card');
    const cardItemBody = document.createElement('div');
    cardItemBody.classList.add('card-body');
    cardItemBody.appendChild(createCardHead(post))
    cardItemBody.appendChild(createCardTitle(post.title))
    cardItemBody.appendChild(createCardProgress(post.progress))
    cardItemBody.appendChild(createCardApplicants(post.applied, post.capacity))
    cardItem.appendChild(cardItemBody);
    
    return cardItem;
}

let createCardHead = (post) => {
    const flexItem = document.createElement('div');
    flexItem.classList.add('d-flex');
    flexItem.appendChild(createCardHeadLogoContainer(post.brandLogo));
    flexItem.appendChild(createCardHeadName(post.brandName, post.time));
    flexItem.appendChild(createCardHeadLabel(post.label));

    return flexItem;
}

let createCardHeadLogoContainer = (src) => {
    const logoImgContainer = document.createElement('div');
    logoImgContainer.classList.add('flex-shrink-0', 'logo-container');
    logoImgContainer.appendChild(createCardHeadLogo(src))

    return logoImgContainer;
}

let createCardHeadLogo = (src) => {
    const logoImg = document.createElement('img');
    logoImg.classList.add('img-fluid')
    logoImg.setAttribute('src', src);

    return logoImg;
}

let createCardHeadName = (name, time) => {
    const brandNameContainer = document.createElement('div');
    brandNameContainer.classList.add('flex-grow-1', 'ms-3');
    const brandName = document.createElement('h4');
    brandName.innerHTML = name;
    brandName.classList.add('brand-name');
    const timeElement = document.createElement('span');
    timeElement.innerHTML = time;
    timeElement.classList.add('time');
    brandNameContainer.appendChild(brandName);
    brandNameContainer.appendChild(timeElement);

    return brandNameContainer;
}

let createCardHeadLabel = (labelName) => {
    const labelContainer = document.createElement('div');
    labelContainer.classList.add('flex-shrink-0', 'brand-type');
    const label = document.createElement('button');
    label.innerHTML = labelName;
    label.classList.add('btn', 'btn-warning');
    label.setAttribute('type', 'button');
    labelContainer.appendChild(label);

    return labelContainer;
}

let createCardTitle = (title) => {
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title')
    cardTitle.innerHTML = title;

    return cardTitle;
}

let createCardProgress = (value) => {
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('progress')
    const progress = document.createElement('div');
    progress.classList.add('progress-bar', 'bg-danger');
    progress.style.width = `${value}%`
    progressContainer.appendChild(progress);

    return progressContainer;
}

let createCardApplicants = (applied, capacity) => {
    const applicantsParagraph = document.createElement('p');
    applicantsParagraph.classList.add('applied')
    const appliedNumber = document.createTextNode(`${applied} applied from `);
    const capacityNumber = document.createElement('span');
    capacityNumber.classList.add('total-capacity');
    capacityNumber.innerHTML = `of ${capacity} capacity`;
    applicantsParagraph.appendChild(appliedNumber);
    applicantsParagraph.appendChild(capacityNumber);

    return applicantsParagraph;
}