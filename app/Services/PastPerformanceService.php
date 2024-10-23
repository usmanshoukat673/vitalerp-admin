<?php

namespace App\Services;

use App\Models\CompanyDomain;
use App\Models\LocationServiced;
use App\Models\Supplier;
use App\Models\SupplierLaborCategoryDetail;
use DB;

class PastPerformanceService
{
    /**
     * Get the domains, labor categories, and details for the given supplier and company.
     *
     * @param int $supplierId
     * @param int $compId
     * @return \Illuminate\Support\Collection
     */
    public function getDomainsWithLaborCategoriesAndDetails(int $supplierId, int $compId)
    {
        $domains = CompanyDomain::where('comp_id', $compId)
            ->whereHas('suppliers', function ($query) use ($supplierId) {
                $query->where('supplier_id', $supplierId);
            })
            ->with(['laborCategories' => function ($query) use ($supplierId) {
                // Join with supplier_labor_category_details to get the details for the given supplier and domain
                $query->select('labor_categories.id', 'labor_categories.name', 'domain_labor_categories.domain_id')
                    ->addSelect([
                        'supplier_labor_category_details.id as supplier_labor_category_detail_id',
                        'supplier_labor_category_details.past_performance',
                        'supplier_labor_category_details.last_date_performed_services',
                        'supplier_labor_category_details.max_num_on_one_contract',
                        'supplier_labor_category_details.customer_type',
                        'supplier_labor_category_details.service_rating',
                    ])
                    ->leftJoin('supplier_labor_category_details', function ($join) use ($supplierId) {
                        $join->on('domain_labor_categories.labor_category_id', '=', 'supplier_labor_category_details.labor_category_id')
                            ->on('domain_labor_categories.domain_id', '=', 'supplier_labor_category_details.domain_id') // Ensure the domain_id matches
                            ->where('supplier_labor_category_details.supplier_id', $supplierId);
                    });
            }])
            ->get();

        foreach ($domains as $domain) {
            foreach ($domain->laborCategories as $category) {
                $category->past_performance = boolval($category->past_performance);
                $category->locations_serviced = LocationServiced::where(['slcd_id' => $category->supplier_labor_category_detail_id])->get();
            }
        }

        return $domains;
    }

    public function isCompleted($domains)
    {
        $isCompleted = true;

        if(count($domains) == 0) {
            return false;
        }

        foreach ($domains as $domain) {
            foreach ($domain->laborCategories as $category) {
                if (!$category->past_performance && ($category->last_date_performed_services == null || $category->max_num_on_one_contract == null || count((array) $category->customer_type) == 0 || $category->service_rating == null || count($category->locations_serviced) == 0)) {
                    $isCompleted = false;
                }
            }
        }

        return $isCompleted;
    }

    public function savePerformance(int $supplierId, array $data)
    {
        $supplierLaborCategoryDetails = SupplierLaborCategoryDetail::find($data['id']);

        $supplierLaborCategoryDetails->past_performance = $data['past_performance'];
        $supplierLaborCategoryDetails->last_date_performed_services = $data['last_date_performed_services'];
        $supplierLaborCategoryDetails->max_num_on_one_contract = $data['max_num_on_one_contract'];
        $supplierLaborCategoryDetails->customer_type = $data['customer_type'];
        $supplierLaborCategoryDetails->service_rating = $data['service_rating'];
        $supplierLaborCategoryDetails->save();

        $locations_serviced_ids = $data['locations_serviced'];

        $supplierLaborCategoryDetails->locationsServiced()->whereNotIn('state_id', $locations_serviced_ids)->delete();
 
        if (count($locations_serviced_ids) > 0) {
            foreach ($locations_serviced_ids as $state_id) {
                $supplierLaborCategoryDetails->locationsServiced()->firstOrCreate(['state_id' => $state_id]);
            }
        }

        return true;
    }
}
