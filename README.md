# How to Run the Project

Follow the below steps to run the project:

1. **Rename `.env.example` to `.env` and Update Accordingly**  
 ```bash
   mv .env.example .env
```
2. **Install dependencies**
```bash
   npm install expo && npx expo install
```

3. ⚠️For some reason this package that @aws-sdk/client-s3 uses causes error, to not experience any error related to this package **Go to the file `node_modules/@smithy/util-stream/package.json` and  edit line "main": "./dist-cjs/index.js" to "main": "./dist-es/index.js"**

4. **Run project**
```bash
   npx expo start -c
```

