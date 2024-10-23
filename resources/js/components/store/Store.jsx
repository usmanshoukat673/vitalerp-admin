import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "semantic-ui-react";
import StoreFilterBox from "./filter/StoreFilterBox";
import StoreSlider from "./slider/StoreSlider";
import { useParams } from 'react-router-dom';
import Product from "./products/Product";
import _ from "lodash";
import StoreDrawer from "./drawer/StoreDrawer";
import axiosInstance from "../../api/api";

const Store = ({ company, history }) => {

    const [category, setCategory] = useState('');
    const [search_term, setSearchTerm] = useState('');
    const [searching, setSearching] = useState(false);
    const [_store_type, setStoreType] = useState('standards');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [products, setProducts] = useState([]);
    const [featured_products, setFeaturedProducts] = useState([]);
    const { store_type } = useParams();

    const { std_families, std_versions, std_focuses, std_statutes, std_types } = useSelector((state) => ({
        std_types: state.marketplace.std_types,
        std_families: state.marketplace.std_families,
        std_versions: state.marketplace.std_versions,
        std_focuses: state.marketplace.std_focuses,
        std_statutes: state.marketplace.std_statutes,
    }));

    const getIds = (items, name, filter_name) => {
        // items = items.filter(obj => obj.checked).map(obj => obj.id);
        items = _.chain(items)
            .filter({ checked: true })
            .map('id')
            .value();
        if(_.size(items) > 0)
        {
            return `&${filter_name}=${filter_name}&${name}=${items.join(',')}`;
        }
        else{
            return '';
        }
    }

    useEffect(() => {
        featuredProductions();
    }, []);

    const loadStabdards = () => {
        setLoading(true);
        axiosInstance.get(`/api/user/marketplace/products?search=search&search_term=${search_term}${getIds(std_types, 'std_types', 'types')}${getIds(std_families, 'std_families', 'families')}${getIds(std_versions, 'std_versions', 'versions')}${getIds(std_focuses, 'std_focuses', 'focuses')}${getIds(std_statutes, 'std_statutes', 'statutes')}&comp_id=${company.id}`).then(e => {
            setProducts(e.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }


    useEffect(() => {
        loadStabdards();
    }, [std_types, std_families, std_versions, std_focuses, std_statutes, store_type, search_term]);

    const featuredProductions = () => {
        setLoading(true);
        axiosInstance.get(`/api/user/marketplace/featured-products`).then(e => {
            setFeaturedProducts(e.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const handleSearch = (search_value) => {
        setSearchTerm(search_value);
    }

    const optimizedFn = useCallback(debounce(handleSearch), []);

    return (
        <>
            <div className="store__module">

                {/* Left sub nav */}
                <StoreFilterBox store_type={_store_type} />

                <div className="store_wrapper">
                    <div className="page__header">
                        <div className="heading">
                            Marketplace
                        </div>
                        <div>
                            <Input
                                className={searching ? 'loading' : ''}
                                onChange={(e) => optimizedFn(e.target.value)}
                                style={{ width: '350px' }}
                                icon='search' placeholder='Search...' />
                        </div>
                    </div>

                    <div className="__slider_wrapper" style={{minHeight: _.size(featured_products) > 0 ? '334px': 'none'}}>
                        <StoreSlider featured_products={featured_products} />
                    </div>

                    <div className="__products__wrapper">
                        {
                            _.map(products, (product, index) => {
                                return <Product key={index} product={product} />
                            })
                        }
                    </div>
                </div>
            </div>

            <StoreDrawer title="Standard" />
        </>
    )
}

export default Store;