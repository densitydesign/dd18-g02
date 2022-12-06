// Interpret the data as the correct format. Use d3.csv or d3.tsv accordingly.
data = d3.csv("assets/data/prov.csv");

// Select the container where we will put our HTML elements
let container = d3.select(".container");

container.append('div')
    .attr('class', 'col')
    .append('div')
    .attr('class', 'flex-row head sub')
    .append('p')
    .text('recipes')
    .append('div')
container.select('.col')
    .append('div')
    .attr('id', 'all-filters')
    .attr('class', 'flex-row filter')



container.append('div')
    .attr('class', 'col-md-auto')
    .append('div')
    .attr('class', 'flex-row head sub')
    .append('p')
    .text('products')

container.select('.col-md-auto')
    .append('div')
    .attr('id', 'all-cards')
    .attr('class', 'card-columns')


let cards = d3.select("#all-cards")


// Load data
data.then(function (data) {
    // Join your data to the creation of div elements to the same number of items in your dataset.
    let card = cards.selectAll("div")
        .data(data)
        .join("div")
        .attr("class", "flex-column card")

    // We append to the initial card all the parts required.
    // HEADER
    card.append("div")
        .attr("class", "flex-column cardHeader")
        .append('a')
        .attr('href', function (d) { return d.Url })
        .attr('target', '_blank')
        .append('img')
        .attr('src', 'assets/icon/link.svg')
    // .wrap("<a xlink:href \"http://example.com/\"></a>")
    // .attr('href', function(d){return d.Url})

    card.append("p")
        .attr("class", "flex-row card-content")
        .text(function (data) {
            return data.Context
        })

    card.append("div")
        .attr("class", "flex-row cardFooter")
    //tags
    var allBtns = ['Keyword', 'TagAnimal', 'TagDistribution', 'TagEnergy', 'TagFood', 'TagManagement', 'TagWaste', 'Actions', 'Data', 'SentenceAim'];

    for (let i = 0; i < allBtns.length; i++) {

        card.select(".cardFooter")
            .append('div')
            .attr("class", function () {
                if (i < 8) { return "flex-row roundTag " + allBtns[i] }
                else { return "flex-row squareTag " + allBtns[i] }
            })
        var tag = card.select('.' + allBtns[i])
            .style('display', function (d) {
                if (i > 0 && i <= 7) {
                    if (d[allBtns[i]] == 'FALSE') {
                        return 'none'
                    } else { return 'flex' }
                }
            })
            .style('background-color', function (d) {
                if (i == 0) { return "var(--primary-color)" }
            })
        tag.append('img')
            .attr('src', function () {
                if (i == 0) { return 'assets/icon/keyword.svg' }
                else if (i <= 7) { return 'assets/icon/topic.svg' }
                else if (i == 8) { return 'assets/icon/data.svg' }
                else { return 'assets/icon/action.svg' }
            })
        tag.append("p")
            .text(function (d) {
                if (i == 0) {
                    return d.Keyword
                }
                else if (i <= 7) { return allBtns[i] }
                else if (i == 8) {
                    if (d[allBtns[i]] == 'TRUE') {
                        return 'data'
                    } else { return 'no data' }
                }
                else if (i == 9) { return d[allBtns[i]] }
            })
    }

})

//filter
let filterDiv = d3.select("#all-filters")
let filter = filterDiv.selectAll("div")
    .data(recipes)
    .join("div")
    .attr("class", "flex-column recipe")
// .style("max-width", "10rem")
filter.append("div")
    .attr("class", "flex-column card-body")
var filterBody = filter.select('.card-body')
filterBody
    .append('p')
    .attr("class", "card-text")
    .text(function (a) {
        return a.title
    })
filterBody
    .append('h5')
    .text('ingredients')


//iterate
let recipeIngredientTitle = ['Keyword', 'Topic', 'Aim', 'Evidence'];
for (let i = 0; i < recipeIngredientTitle.length; i++) {
    filterBody
        .append('div')
        .attr("class", "flex-row recipe-row" + i)
    let recipeRow = filterBody.select('.recipe-row' + i)
    recipeRow
        .append('div')//nome
        .attr("class", "recipe-ingredient-title")
        .append('p')
        .text(function () {
            return recipeIngredientTitle[i] + ' :'
        })
    recipeRow
        .append('div')//nome
        .attr("class", "flex-column recipe-row-T" + i)
    let recipeRowT = recipeRow.select('.recipe-row-T' + i)

    //iterate

    let nOfTags = 1
    if (i == 1) { nOfTags = 2 } else { nOfTags = 1 }
    for (let j = 0; j < nOfTags; j++) {
        recipeRowT.append('div')
            .attr("class", "flex-row roundTag" + i)
        var tag = recipeRowT.select(".roundTag" + i)
            .attr('class', function () {
                if (i < 2) { return "roundTag" }
                else { return "squareTag" }
            })
        tag.append('img')
            .attr('src', function () {
                if (i == 0) { return 'assets/icon/keyword.svg' }
                else if (i == 1) { return 'assets/icon/topic.svg' }
                else if (i == 2) { return 'assets/icon/action.svg' }
                else { return 'assets/icon/data.svg' }
            })


        tag.append("p")
            .text(function (d) {
                if (i == 0) { return d.Keyword }
                else if (i == 1) {
                    let recipeTopicArray = []
                    if (d.TagAnimal == 'TRUE') { recipeTopicArray.push('TagAnimal') }
                    if (d.TagDistribution == 'TRUE') { recipeTopicArray.push('TagDistribution') }
                    if (d.TagEnergy == 'TRUE') { recipeTopicArray.push('TagEnergy') }
                    if (d.TagFood == 'TRUE') { recipeTopicArray.push('TagFood') }
                    if (d.TagManagement == 'TRUE') { recipeTopicArray.push('TagManagement') }
                    if (d.TagWaste == 'TRUE') { recipeTopicArray.push('TagWaste') }
                    if (d.Actions == 'TRUE') { recipeTopicArray.push('Actions') }

                    if (j == 0) { return recipeTopicArray[0] }
                    else { return recipeTopicArray[1] }
                }
                else if (i == 2) { return d.SentenceAim }
                else if (i == 3) { if (d.ToV == 'TRUE') { return 'Data' } else if (d.ToV == 'FALSE'){ return 'no data' } }
            })
    }
}

var archiveOpen = false
//fine iterazione
filter
    .style('cursor', 'pointer')
    .on('click', function (btnId) {
        if (archiveOpen == false) {
            d3.select('.container').selectAll('.col')
                .style('max-width', '300px')
                .style('width', 'auto')
            d3.select('.container').selectAll('.col-md-auto')
                .style('max-width', 'calc(100% - 300px)')
                .style('width', '100%')
            archiveOpen = true
        } else if (archiveOpen == true) {
            d3.select('.container').selectAll('.col')
                .style('max-width', 'none')
                .style('width', ' width: 100%;')
            d3.select('.container').selectAll('.col-md-auto')
                .style('max-width', 'calc(100% - 300px)')
                .style('width', '0')
            archiveOpen = false
        }

        let recipe = recipes[btnId.srcElement.__data__.recipeId];
        d3.select("#all-cards").selectAll('.card')
            .style('display', 'none')
            .filter(function (d) {
                return (
                    ((d.SentenceAim == recipe.SentenceAim) || (recipe.SentenceAim == undefined)) &&
                    ((d.Keyword == recipe.Keyword) || (recipe.Keyword == undefined)) &&
                    ((d.ToV == recipe.ToV) || (recipe.ToV == undefined)) &&
                    ((d.Actions == recipe.Actions) || (recipe.Actions == undefined)) &&
                    ((d.TagAnimal == recipe.TagAnimal) || (recipe.TagAnimal == undefined)) &&
                    ((d.TagDistribution == recipe.TagDistribution) || (recipe.TagDistribution == undefined)) &&
                    ((d.TagEnergy == recipe.TagEnergy) || (recipe.TagEnergy == undefined)) &&
                    ((d.TagFood == recipe.TagFood) || (recipe.TagFood == undefined)) &&
                    ((d.TagManagement == recipe.TagManagement) || (recipe.TagManagement == undefined)) &&
                    ((d.TagWaste == recipe.TagWaste) || (recipe.TagWaste == undefined))
                )
            })
            .style('display', 'inline-flex');
    });








