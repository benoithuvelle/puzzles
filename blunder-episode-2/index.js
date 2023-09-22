const building = new Array(+readline())
    .fill(0)
    .map(readline)
    .reduce((obj, c) => {
        const [room, money, n1, n2] = c.split(' ').map((x) => +x);
        let neighbours;
        if (!Number.isNaN(n1) || !Number.isNaN(n2))
        {
            neighbours = [];
            if (!Number.isNaN(n1))
                neighbours.push(n1);
            if (!Number.isNaN(n2))
                neighbours.push(n2);
        }

        obj[room] = { id: room, money, neighbours };
        return obj;
    }, {});

const moneyInRoom = new Map();

function getMoney(roomId)
{
    const room = building[roomId];
    const roomValue = moneyInRoom.get(roomId);
    if (roomValue)
        return roomValue;

    if (!room.neighbours)
        return room.money;
    else
    {
        const maxMoney = room.money + Math.max(...room.neighbours.map((n) => getMoney(n)));
        moneyInRoom.set(roomId, maxMoney);
        return maxMoney;
    }
}

print(getMoney(0));
