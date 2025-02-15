"use client"
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
export default function SettingsTab() {
    const [restaurantName, setRestaurantName] = useState('The Tipsy Tavern')
    const [restaurantDescription, setRestaurantDescription] = useState('')
    const [qrCodeGenerationFrequency, setQrCodeGenerationFrequency] = useState('daily')
    const [logo, setLogo] = useState('')
    const [offers, setOffers] = useState([
        {
            description: '10% off on all orders',
            isTimeBased: false,
            duration: ''
        }
    ])

    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => setLogo(reader.result as string)
        reader.readAsDataURL(file)
    }
    interface Offer {

    }
    const handleOfferChange = (index: number, key: keyof Offer, value: string) => {
        const updatedOffers = [...offers]
        updatedOffers[index][key] = value
        setOffers(updatedOffers)
    }
    const addOffer = () => {
        setOffers([...offers, {
            description: '',
            isTimeBased: false,
            duration: ''
        }])
    }
    const removeOffer = (index: number) => {
        const updatedOffers = [...offers]
        updatedOffers.splice(index, 1)
        setOffers(updatedOffers)
    }
    const generateQRCode = () => {
        // Generate QR code
    }
    const saveRestaurantDetails = () => {
        // Save restaurant details
    }

    return (
        <Card className="col-span-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
                <CardTitle>Restaurant Details</CardTitle>
                <CardDescription className="text-pink-100">Update your restaurant information and offers</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Name</Label>
                        <Input
                            id="name"
                            placeholder="Your restaurant name"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            className="border-2 border-pink-200 focus:border-pink-500 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-lg font-semibold text-gray-700">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your restaurant"
                            value={restaurantDescription}
                            onChange={(e) => setRestaurantDescription(e.target.value)}
                            className="border-2 border-pink-200 focus:border-pink-500 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="logo" className="text-lg font-semibold text-gray-700">Logo</Label>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                <AvatarImage src={logo} alt="Restaurant logo" />
                                <AvatarFallback>LOGO</AvatarFallback>
                            </Avatar>
                            <Input id="logo" type="file" onChange={handleLogoUpload} className="border-2 border-pink-200 focus:border-pink-500 rounded-md" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="qr-frequency" className="text-lg font-semibold text-gray-700">QR Code Generation Frequency</Label>
                        <Select value={qrCodeGenerationFrequency} onValueChange={setQrCodeGenerationFrequency}>
                            <SelectTrigger id="qr-frequency" className="border-2 border-pink-200 focus:border-pink-500 rounded-md">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold text-gray-700">Offers</Label>
                        {offers.map((offer, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Input
                                    placeholder={`Offer ${index + 1}`}
                                    value={offer.description}
                                    onChange={(e) => handleOfferChange(index, 'description', e.target.value)}
                                    className="border-2 border-pink-200 focus:border-pink-500 rounded-md"
                                />
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor={`offer-type-${index}`} className="text-sm text-gray-600">Time-based</Label>
                                    <Switch
                                        id={`offer-type-${index}`}
                                        checked={offer.isTimeBased}
                                        onCheckedChange={(checked) => handleOfferChange(index, 'isTimeBased', checked)}
                                    />
                                </div>
                                {offer.isTimeBased && (
                                    <Input
                                        placeholder="Duration (e.g., 2 hours)"
                                        value={offer.duration}
                                        onChange={(e) => handleOfferChange(index, 'duration', e.target.value)}
                                        className="border-2 border-pink-200 focus:border-pink-500 rounded-md"
                                    />
                                )}
                                <Button type="button" variant="outline" size="icon" onClick={() => removeOffer(index)} className="text-rose-500 hover:text-rose-600">
                                    <AlertCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addOffer} className="mt-2 text-pink-600 hover:text-pink-700 border-pink-300 hover:border-pink-400">
                            Add Offer
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between bg-gradient-to-r from-pink-100 to-rose-100 p-6">
                <Button variant="outline" onClick={generateQRCode} className="bg-white text-pink-600 hover:bg-pink-50">Generate New QR Code</Button>
                <Button onClick={saveRestaurantDetails} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600">Save Changes</Button>
            </CardFooter>
        </Card>
    )
}

