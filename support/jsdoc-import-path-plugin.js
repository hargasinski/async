const path = require('path');

exports.handlers = {
    jsdocCommentFound: function(e) {
        var moduleName = path.parse(e.filename).name;


        var lines = e.comment.split(/\r?\n/);

        var importLines = [
            '```',
            `import ${moduleName} from 'async/${moduleName}';`,
            '```'
        ];

        e.comment = [lines[0], ...importLines, ...lines.slice(1)].join("\n");
    }
};
