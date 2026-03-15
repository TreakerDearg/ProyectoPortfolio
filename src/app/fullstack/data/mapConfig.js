// Tipos de celdas:
// 0: vacío, 1: pared, 2: habitación, 3: servidor, 4: entrada

// Genera un laberinto aleatorio con caminos conectados (algoritmo de Prim simplificado)
function generateMaze(rows, cols) {
  const maze = Array(rows).fill().map(() => Array(cols).fill(1));

  const startY = Math.floor(Math.random() * (rows-2)) + 1;
  const startX = Math.floor(Math.random() * (cols-2)) + 1;
  maze[startY][startX] = 0;

  const frontiers = [];
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

  for (const [dy, dx] of dirs) {
    const ny = startY + dy*2;
    const nx = startX + dx*2;
    if (ny > 0 && ny < rows-1 && nx > 0 && nx < cols-1 && maze[ny][nx] === 1) {
      frontiers.push([ny, nx, startY + dy, startX + dx]);
    }
  }

  while (frontiers.length) {
    const idx = Math.floor(Math.random() * frontiers.length);
    const [fy, fx, py, px] = frontiers[idx];
    maze[fy][fx] = 0;
    maze[py][px] = 0;
    frontiers.splice(idx, 1);

    for (const [dy, dx] of dirs) {
      const nfy = fy + dy*2;
      const nfx = fx + dx*2;
      if (nfy > 0 && nfy < rows-1 && nfx > 0 && nfx < cols-1 && maze[nfy][nfx] === 1) {
        if (!frontiers.some(([y,x]) => y === nfy && x === nfx)) {
          frontiers.push([nfy, nfx, fy + dy, fx + dx]);
        }
      }
    }
  }
  return maze;
}

// Convierte el laberinto en mapa con habitaciones y servidores aleatorios
export const generateMap = () => {
  const maze = generateMaze(8, 8);

  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      if (maze[i][j] === 0) {
        const rand = Math.random();
        if (rand < 0.2) maze[i][j] = 2;       // habitación
        else if (rand < 0.3) maze[i][j] = 3;  // servidor
      }
    }
  }

  // Colocar entrada en una celda vacía
  const emptyCells = [];
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      if (maze[i][j] === 0) emptyCells.push([i, j]);
    }
  }
  if (emptyCells.length === 0) {
    maze[1][1] = 0;
    emptyCells.push([1,1]);
  }
  const [ey, ex] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  maze[ey][ex] = 4;

  return maze;
};

export const initialMap = generateMap();

// Genera la meta en una celda vacía (no entrada)
export const generateTarget = (map) => {
  const candidates = [];
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      if (map[i][j] === 0) candidates.push([i, j]);
    }
  }
  if (candidates.length === 0) {
    for (let i = 1; i < 7; i++) {
      for (let j = 1; j < 7; j++) {
        if (map[i][j] !== 4) candidates.push([i, j]);
      }
    }
  }
  const [y, x] = candidates[Math.floor(Math.random() * candidates.length)];
  return { y, x };
};

// Mutación (cambia una celda aleatoria manteniendo conectividad básica)
export const mutateMap = (oldMap) => {
  const newMap = oldMap.map(row => [...row]);
  const y = Math.floor(Math.random() * 6) + 1;
  const x = Math.floor(Math.random() * 6) + 1;
  if (newMap[y][x] !== 4) {
    const rand = Math.random();
    if (rand < 0.3) newMap[y][x] = 0;
    else if (rand < 0.6) newMap[y][x] = 2;
    else newMap[y][x] = 3;
  }
  return newMap;
};