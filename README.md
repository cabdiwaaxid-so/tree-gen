# tree-gen

Generate entire file and folder structures from ASCII tree diagrams or path lists.

## Installation

```bash
npm install -g @cabdi_waaxid/tree-gen
```

## Usage

### From a tree file
Create a `structure.txt` file:

```text
my-project/
├── src/
│   ├── index.js
│   ├── utils.js
│   └── components/
│       └── App.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

Run:

```bash
tree-gen structure.txt
```

### Force overwrite existing files

```bash
tree-gen --force structure.txt
# or
tree-gen -f structure.txt
```

### From a tree string directly

```bash
tree-gen "my-app/├── src/│   ├── index.js│   └── style.css└── README.md"
```

### From a list of paths

```bash
tree-gen backend/src/server.js backend/src/routes/api.js backend/package.json backend/.env
```

### With trailing slashes for directories

```bash
tree-gen logs/ temp/ output/file.txt
```

## Options

| Flag | Description |
|------|-------------|
| `--force`, `-f` | Overwrite existing files if they already exist |

## Tree Syntax

- `├──` - Branch item
- `└──` - Last branch item  
- `│` - Vertical line connecting nested items
- `─` - Horizontal line (ignored)
- Trailing `/` - Creates a directory instead of a file

## Examples

### React component structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Button.jsx
├── pages/
│   ├── Home.jsx
│   └── About.jsx
├── styles/
│   └── main.css
└── index.js
```

### API structure

```text
api/
├── controllers/
│   ├── userController.js
│   └── productController.js
├── models/
│   ├── User.js
│   └── Product.js
├── routes/
│   └── apiRoutes.js
├── middleware/
│   └── auth.js
└── server.js
```

## Notes

- All created files are empty (you'll fill them with content later)
- Existing files are **not** overwritten by default (use `--force` to overwrite)
- The tool automatically creates parent directories as needed
- Tree lines without `├` or `└` are treated as the root directory

## License

MIT