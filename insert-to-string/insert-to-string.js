const text = readline()
    .split('\\n')
    .map((l) => l.split(''));

const commands = new Array(+readline())
    .fill(0)
    .map(() => {
        const [line, column, str] = readline().split('|');
        return { line: +line, column: +column, str };
    })
    .sort((a, b) => {
        if (a.line !== b.line)
            return b.line - a.line;
        if (a.column !== b.column)
            return b.column - a.column;
        else
            return 0;
    });

for (const command of commands)
{
    const { line, column, str } = command;
    text[line].splice(column, 0, ...str);
}

for (const line of text)
{
    const t = line
        .join('')
        .split('\\n')
        .forEach((part) => console.log(part));
}
