import { MapPin, Calendar, Globe, Mail, Instagram, Youtube, ExternalLink, Users, Theater, Play, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface KeyPerson {
    id: string;
    name: string;
    role: string;
    created_at: string;
    profile_id: string;
}

export interface PastProduction {
    id: string;
    name: string;
    video_url: string;
    created_at: string;
    image_urls: string[];
    profile_id: string;
    updated_at: string | null;
}

export interface OrganisationData {
    profile_id: string;
    organisation_name: string;
    organisation_types: string[];
    city: string;
    state: string;
    country: string;
    primary_languages: string[];
    core_work: string[];
    contact_email: string;
    instagram?: string;
    short_description: string;
    founded_year: string;
    website?: string;
    youtube?: string;
    created_at: string;
    organisation_key_people: KeyPerson[];
    organisation_past_productions: PastProduction[];
}


interface OrganisationProfileProps {
    organisation: OrganisationData;
}

const normalizeUrl = (url: string): string =>
    url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;


export function OrganisationProfileView({ organisation }: OrganisationProfileProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <header className="bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    {/* Organisation Types */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {organisation?.organisation_types?.length > 0 && (
                            organisation?.organisation_types?.map((type, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs font-medium"
                                >
                                    {type}
                                </Badge>
                            ))
                        )}

                    </div>

                    {/* Name & Description */}
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-4">
                        {organisation.organisation_name}
                    </h1>

                    <p className="text-muted-foreground text-base lg:text-lg max-w-3xl leading-relaxed mb-6">
                        {organisation.short_description}
                    </p>

                    {/* Meta Info Row */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {organisation.city}, {organisation.state}, {organisation.country}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            Est. {organisation.founded_year}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button asChild>
                            <a href={`mailto:${organisation.contact_email}`}>
                                <Mail className="w-4 h-4 mr-2" />
                                Contact
                            </a>
                        </Button>
                        {organisation.website && (
                            <Button variant="outline" asChild>
                                <a href={normalizeUrl(organisation.website)} target="_blank" rel="noopener noreferrer">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Website
                                </a>
                            </Button>
                        )}
                        {organisation.instagram && (
                            <Button variant="outline" size="icon" asChild>
                                <a href={normalizeUrl(organisation.instagram)} target="_blank" rel="noopener noreferrer">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            </Button>
                        )}
                        {organisation.youtube && (
                            <Button variant="outline" size="icon" asChild>
                                <a href={normalizeUrl(organisation.youtube)} target="_blank" rel="noopener noreferrer">
                                    <Youtube className="w-4 h-4" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Sidebar Info */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* Languages */}
                        <Card className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Theater className="w-4 h-4 text-accent" />
                                <h3 className="font-semibold text-sm text-foreground">Languages</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {organisation.primary_languages.map((lang, index) => (
                                    <Badge key={index} variant="outline" className="font-normal">
                                        {lang}
                                    </Badge>
                                ))}
                            </div>
                        </Card>

                        {/* Core Work */}
                        <Card className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Play className="w-4 h-4 text-accent" />
                                <h3 className="font-semibold text-sm text-foreground">Core Work</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {organisation.core_work.map((work, index) => (
                                    <Badge key={index} variant="outline" className="font-normal">
                                        {work}
                                    </Badge>
                                ))}
                            </div>
                        </Card>

                        {/* Key People */}
                        {organisation.organisation_key_people.length > 0 && (
                            <Card className="p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Users className="w-4 h-4 text-accent" />
                                    <h3 className="font-semibold text-sm text-foreground">Key People</h3>
                                </div>
                                <div className="space-y-3">
                                    {organisation.organisation_key_people.map((person) => (
                                        <div key={person.id} className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">{person.name}</p>
                                                <p className="text-xs text-muted-foreground capitalize">{person.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </aside>

                    {/* Productions */}
                    <section className="lg:col-span-2">
                        {organisation.organisation_past_productions.length > 0 && (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-2xl text-foreground">Past Productions</h2>
                                    <span className="text-sm text-muted-foreground">
                                        {organisation.organisation_past_productions.length} productions
                                    </span>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {organisation.organisation_past_productions.map((production) => (
                                        <Card key={production.id} className="overflow-hidden group">
                                            {/* Image */}
                                            <div className="aspect-video bg-secondary relative overflow-hidden">
                                                {production.image_urls && production.image_urls.length > 0 ? (
                                                    <img
                                                        src={production.image_urls[0]}
                                                        alt={production.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Play className="w-10 h-10 text-muted-foreground/30" />
                                                    </div>
                                                )}

                                                {/* Video overlay */}
                                                {production.video_url && (
                                                    <a
                                                        href={production.video_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="absolute inset-0 bg-foreground/0 hover:bg-foreground/20 flex items-center justify-center transition-colors"
                                                    >
                                                        <div className="w-12 h-12 rounded-full bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Play className="w-5 h-5 text-foreground ml-0.5" fill="currentColor" />
                                                        </div>
                                                    </a>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="font-semibold text-foreground">{production.name}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {new Date(production.created_at).getFullYear()}
                                                        </p>
                                                    </div>
                                                    {production.video_url && (
                                                        <Button variant="ghost" size="icon" className="flex-shrink-0 -mr-2" asChild>
                                                            <a href={normalizeUrl(production.video_url)} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </main>

        </div>
    );
}
