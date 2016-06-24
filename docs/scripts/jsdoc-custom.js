// https://github.com/twbs/bootstrap/issues/1768
function shiftWindow() {
    scrollBy(0, -50);
}

function fixAnchorPosition() {
    if (location.hash) {
        shiftWindow();
    }
}

function initSearchBar() {
    var methodNames = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: './methodNames.json'
    });

    var sourceFiles = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: './sourceFiles.json'
    });

    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
        updater: function(item) {
            console.log(item);
            // Do something with item
            return item;
        }
    },
    {
        name: 'Methods',
        source: methodNames,
        templates: {
            header: '<h3 class="search-bar-header">Methods</h3>'
        }
    },
    {
        name: 'Files',
        source: sourceFiles,
        templates: {
            header: '<h3 class="search-bar-header">Source Files</h3>'
        }
    }).on('typeahead:selected', function(e){
        e.target.form.submit();
   });;
}

function init() {
    $('form').submit(function(e) {
        e.preventDefault();
        console.log('submitted');
    });

    fixAnchorPosition();
    window.addEventListener("hashchange", shiftWindow, false);
    initSearchBar();
}

$(init);
