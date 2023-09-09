const N = parseInt(readline());
for (let i = 0; i < N; i++)
{
    const line = readline();
    let count = 0;
    for (let i = 0; i < line.length; )
    {
        if (line[i] === 'f')
        {
            count++;
            i += 3;
        }
        else
            i++;
    }
    print(count);
}
