import { router as productRouter} from './product.js'
import { router as userRouter} from './user.js'
import { router as brandRouter } from './brand.js';

function route(app) {
    app.use('/product', productRouter);
    app.use('/user', userRouter);
    app.use('/brand', brandRouter);
}

export { route };