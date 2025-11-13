import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio, Button, Checkbox, MenuItem, TextField, RadioGroup } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import {
  SIZE_GUIDE,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS_BY_GENDER,
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import img2 from '../../assets/images/img1.png';
import img3 from '../../assets/images/img3.png';
import img1 from '../../assets/images/img_2.png';

const seasons = [
  'Spring',
  'Summer',
  'Autumn',
  'Winter',
  'Spring/Summer',
  'Fall/Winter',
  'All Season',
];

// ----------------------------------------------------------------------

const SummaryRow = ({ label, value, valueColor }) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" color={valueColor || 'text.primary'}>
      {value}
    </Typography>
  </Stack>
);

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
  images: schemaHelper.files({ message: { required_error: 'Images is required!' } }),
  code: zod.string().min(1, { message: 'Product code is required!' }),
  sku: zod.string().min(1, { message: 'Product sku is required!' }),
  quantity: zod.number().min(1, { message: 'Quantity is required!' }),
  colors: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  sizes: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  gender: zod.string().min(1, { message: 'Gender is required!' }),
  price: zod.number().min(1, { message: 'Price should not be $0.00' }),
  // Not required
  category: zod.string(),
  brand: zod.string(),
  priceSale: zod.number(),
  storePrice: zod.number(),
  subDescription: zod.string(),
  taxes: zod.number(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  subcategory: zod.string().optional(), // or required if needed
  customColors: zod.string().optional(),
});

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  // console.log(_tags);

  const [includeTaxes, setIncludeTaxes] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomSubcategory, setShowCustomSubcategory] = useState(false);
  const [showCustomSize, setShowCustomSize] = useState(false);

  const [selectedSeason, setSelectedSeason] = useState('');

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      storePrice: currentProduct?.storePrice || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || '',
      category: currentProduct?.category || PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
      subcategory: currentProduct?.subcategory || '',
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const selectedGender = watch('gender'); // from react-hook-form
  const selectedCategory = watch('category');
  const subcategory = watch('subcategory');
  const selectedColors = watch('colors');
  const hasCustom = Array.isArray(selectedColors) && selectedColors.includes('Custom');

  const categories = selectedGender
    ? Object.keys(PRODUCT_CATEGORY_OPTIONS_BY_GENDER[selectedGender] || {})
    : [];

  const subcategories =
    selectedGender && selectedCategory
      ? PRODUCT_CATEGORY_OPTIONS_BY_GENDER[selectedGender]?.[selectedCategory] || []
      : [];

  const sizeOptions =
    selectedGender && subcategory ? SIZE_GUIDE?.[selectedGender]?.[subcategory] || [] : [];

  console.log('sizeOptions', sizeOptions.length, sizeOptions);

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', [], { shouldValidate: true });
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const renderDetails = (
    <Card>
      <CardHeader
        title="Basic Product Info"
        subheader="Identify and describe the product clearly."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Field.Select native name="gender" label="Gender" InputLabelProps={{ shrink: true }}>
            <option value="">Select Gender</option>
            {['Men', 'Women', 'Kids', 'Bisex'].map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Field.Select>
        </Stack>
        <Field.Text name="name" label="Product name" />

        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Stack spacing={2}>
            <Field.Select
              native
              name="category"
              label="Category"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                const { value } = e.target;

                setValue('category', value); // using react-hook-form
                setShowCustomCategory(value === 'custom');
              }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="custom">Custom</option>
            </Field.Select>

            {showCustomCategory && (
              <Field.Text
                name="customCategory"
                label="Enter Custom Category"
                placeholder="e.g. Ethnic Wear"
                InputLabelProps={{ shrink: true }}
              />
            )}
          </Stack>

          <Stack spacing={2}>
            <Field.Select
              native
              name="subcategory"
              label="Subcategory"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                const { value } = e.target;

                setValue('subcategory', value); // from react-hook-form
                setShowCustomSubcategory(value === 'custom'); // assuming you're managing this state
              }}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
              <option value="custom">Custom</option>
            </Field.Select>
            {showCustomSubcategory && (
              <Field.Text
                name="customSubcategory"
                label="Enter  Subcategory"
                placeholder="Custom Subcategory"
              />
            )}
          </Stack>
        </Box>

        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          {/* {sizeOptions.length > 0 ? (
            <Field.MultiCheckbox
              name="sizes"
              label="Select Sizes"
              options={sizeOptions.map((size) => ({ label: size, value: size }))}
              sx={{ flexDirection: 'row', gap: 2 }}
            />
          ) : (
            <Field.Text
              name="sizes"
              label="Custom Sizes (comma-separated)"
              placeholder="e.g. XS, S, M, L"
            />
          )} */}

          <Stack spacing={2}>
            <Field.Select
              native
              name="sizes"
              label="Select Sizes"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                const { value } = e.target;

                setValue('sizes', value); // using react-hook-form
                setShowCustomSize(value === 'custom');
              }}
            >
              <option value="">Select Sizes</option>
              {sizeOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="custom">Custom</option>
            </Field.Select>

            {showCustomSize && (
              <Field.Text
                name="customSize"
                label="Enter Custom Size"
                placeholder="e.g. XS, S, M, L"
                InputLabelProps={{ shrink: true }}
              />
            )}
          </Stack>

          <Stack spacing={2}>
            {/* Predefined Color Dropdown */}
            <Field.MultiSelect
              checkbox
              name="colors"
              label="Colors"
              options={PRODUCT_COLOR_NAME_OPTIONS}
            />

            {/* Show Text Input only if "Custom" is selected */}
            {hasCustom && (
              <Field.Text
                name="customColors"
                label="Enter Custom Colors"
                placeholder="e.g. Petrol Green, Cream Beige"
              />
            )}
          </Stack>
        </Box>

        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="brand" label="Brand" />

          <TextField
            select
            label="Season"
            fullWidth
            variant="outlined"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            {seasons.map((season) => (
              <MenuItem key={season} value={season}>
                {season}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Field.Text name="subDescription" label="Sub description" multiline rows={4} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="description" sx={{ maxHeight: 480 }} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="Images & Media"
        subheader="Visual representation of the product"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={1.5} sx={{ p: 3 }}>
        <Typography variant="subtitle2">Images</Typography>
        <Field.Upload
          multiple
          thumbnail
          name="images"
          maxSize={3145728}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
          onUpload={() => console.info('ON UPLOAD')}
        />
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          {/* <Field.Text name="code" label="Product code" /> */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>
    </Card>
  );

  const renderPricing = (
    <Card>
      <CardHeader
        title="Product Variants"
        subheader="Define Product  sku, Stock levels ans pricing."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="quantity"
          label="Quantity"
          placeholder="0"
          type="number"
          InputLabelProps={{ shrink: true }}
        />
        <Field.Text name="sku" label="Product SKU" />

        <Field.Text
          name="storePrice"
          label="Store Price"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  $
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="priceSale"
          label="Platform price"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  $
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="subtitle1" fontWeight={600}>
          Shipping Package Dimensions
        </Typography>

        <Stack direction="row" spacing={2}>
          <Field.Text
            name="packageWeight"
            label="Weight (kg)"
            placeholder="e.g. 1.5"
            type="number"
            InputLabelProps={{ shrink: true }}
          />
          <Field.Text
            name="packageLength"
            label="Length (cm)"
            placeholder="e.g. 30"
            type="number"
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Field.Text
            name="packageWidth"
            label="Width (cm)"
            placeholder="e.g. 20"
            type="number"
            InputLabelProps={{ shrink: true }}
          />
          <Field.Text
            name="packageHeight"
            label="Height (cm)"
            placeholder="e.g. 10"
            type="number"
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Shipping Policy
          </Typography>

          <RadioGroup row name="shippingPolicy" defaultValue="customer">
            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Shipping paid by customer"
            />
            <FormControlLabel value="vendor" control={<Radio />} label="Shipping paid by vendor" />
          </RadioGroup>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Customers prefer free shipping options. Consider this when setting your shipping policy
            to boost sales.
          </Typography>
        </Box>
      </Stack>
    </Card>
  );

  const SubmitProductStatic = (
    <Card>
      <CardHeader title="Submit Product" subheader="Confirm everything and finalize the process." />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Product Info */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Product Information
          </Typography>

          <Stack spacing={1}>
            <SummaryRow label="Product name" value={values.name} />
            <SummaryRow label="Category" value={values.category} />
            <SummaryRow label="Sub categories" value={values.subcategory} />
            <SummaryRow label="Brands" value={values.brand} />
            <SummaryRow label="Gender" value={values.gender} />
          </Stack>
        </Box>

        {/* Variations */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Variations
          </Typography>

          <Stack spacing={1}>
            <SummaryRow label="Quantity" value={values.quantity} />
            <SummaryRow label="Shipping Policy" value="Shipping Paid by Vendor" />
            <SummaryRow label="Colours" value={values.colors} />
            <SummaryRow label="Sizes" value={values.sizes} />
            <SummaryRow label="Store Price" value={values.storePrice} />
            <SummaryRow label="Platform Price" value={values.priceSale} valueColor="success.main" />
            <Typography variant="caption" color="text.secondary">
              All prices include VAT
            </Typography>
          </Stack>
        </Box>

        {/* Images */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>

          <Stack direction="row" spacing={2}>
            <Box component="img" src={img1} sx={{ width: 64, height: 64, borderRadius: 1 }} />
            <Box component="img" src={img2} sx={{ width: 64, height: 64, borderRadius: 1 }} />
            <Box component="img" src={img3} sx={{ width: 64, height: 64, borderRadius: 1 }} />
            <Button size="small" variant="outlined">
              Change
            </Button>
          </Stack>
        </Box>

        {/* Description */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry standard dummy text since the 1500s.
          </Typography>
        </Box>

        {/* Checkbox */}
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="I confirm this product is original and complies with StockMate rules."
        />

        {/* Buttons */}
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentProduct ? 'Submit product' : 'Save changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderPricing}

        {renderProperties}

        {SubmitProductStatic}
        {renderActions}
      </Stack>
    </Form>
  );
}
