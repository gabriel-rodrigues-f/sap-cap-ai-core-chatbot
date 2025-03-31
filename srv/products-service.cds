using {cap.ai.demo as entities} from '../db/Products';

service ProductsService @(path: '/products') {
    entity Product as projection on entities.Product;
}
